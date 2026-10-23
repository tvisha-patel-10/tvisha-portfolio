import React, { useState, useEffect, useRef } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { useDemo } from './state/DemoContext';
import { Header } from './components/Header';
import { DemoControlsPanel } from './components/DemoControlsPanel';
import './App.css';

import { RoundReviewScreen } from './components/review/RoundReviewScreen';
import { RedoStudioScreen } from './components/studio/RedoStudioScreen';
import { ProjectGuideScreen } from './components/onboarding/ProjectGuideScreen';
import { DeviceCheckScreen } from './components/onboarding/DeviceCheckScreen';
import { LiveSessionScreen } from './components/onboarding/LiveSessionScreen';
import { Toast } from './components/common/Toast';

import { RoundClearedScreen } from './components/cleared/RoundClearedScreen';
import { ProcessPage } from './components/story/ProcessPage';

export const AppContent: React.FC = () => {
  const [routeInfo, navigate] = useHashRoute();
  const { state, activeFlags } = useDemo();
  const mainRef = useRef<HTMLElement | null>(null);
  const pageHeadingRef = useRef<HTMLHeadingElement | null>(null);

  // Toast & focus target state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [focusFlagId, setFocusFlagId] = useState<string | null>(null);

  // Focus moves to page h1 on route change per SPEC §11 (unless returning from keeping a take, where RoundReviewScreen focuses next open flag or status card)
  useEffect(() => {
    if (routeInfo.route === 'review' && focusFlagId) {
      return;
    }
    const heading = mainRef.current?.querySelector<HTMLElement>('h1');
    if (heading) {
      heading.focus();
    } else if (pageHeadingRef.current) {
      pageHeadingRef.current.focus();
    }
  }, [routeInfo.route, routeInfo.flagId, focusFlagId]);

  // Demo controls visible only once reaching review/redo/cleared stage per user preference
  const isPostCallStage = ['review', 'redo', 'cleared'].includes(routeInfo.route);

  // When a take is kept in Redo Studio
  const handleTakeKept = (flagId: string) => {
    // Find next open owned flag to focus per SPEC §8 & §11, or focus status card if none remain
    const nextOpen = activeFlags.find(
      (f) =>
        f.id !== flagId &&
        f.fixBy === state.viewAs &&
        f.fixable &&
        (state.flagsState[f.id] ?? 'open') !== 'fixed'
    );
    setFocusFlagId(nextOpen ? nextOpen.id : 'status-card');
    setToastMessage('Saved');
    navigate('#/review');
  };

  return (
    <div
      className="app-container"
      data-reduced-motion={state.reduceMotion ? 'true' : 'false'}
    >
      {routeInfo.route !== 'story' && (
        <Header currentRoute={routeInfo.route} flagId={routeInfo.flagId} />
      )}

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className={`main-layout ${routeInfo.route === 'story' ? 'main-layout-story' : ''}`}
      >
        {routeInfo.route === 'story' && (
          <div className="story-page-wrapper">
            <ProcessPage />
          </div>
        )}

        {routeInfo.route === 'project-guide' && (
          <div className="onboarding-page-wrapper">
            <ProjectGuideScreen onJoinSession={() => navigate('#/device-check')} />
          </div>
        )}

        {routeInfo.route === 'device-check' && (
          <div className="onboarding-page-wrapper">
            <DeviceCheckScreen
              onJoinLobby={() => navigate('#/live-session')}
              onBack={() => navigate('#/project-guide')}
            />
          </div>
        )}

        {routeInfo.route === 'live-session' && (
          <div className="onboarding-page-wrapper">
            <LiveSessionScreen
              onEndCall={() => {
                setFocusFlagId(null);
                navigate('#/review');
              }}
            />
          </div>
        )}

        {routeInfo.route === 'review' && (
          <div className="review-page-wrapper">
            <h1 ref={pageHeadingRef} tabIndex={-1} className="sr-only">
              Round 1 Review
            </h1>
            <RoundReviewScreen
              onNavigateRedo={(flagId) => {
                setFocusFlagId(null);
                navigate(`#/redo/${flagId}`);
              }}
              onNavigateCleared={() => {
                setFocusFlagId(null);
                navigate('#/cleared');
              }}
              onNotify={(msg) => setToastMessage(msg)}
              focusFlagId={focusFlagId}
            />
          </div>
        )}

        {routeInfo.route === 'redo' && (
          <div className="redo-page-wrapper">
            <RedoStudioScreen
              flagId={routeInfo.flagId || 'F3'}
              onBackToReview={() => {
                setFocusFlagId(null);
                navigate('#/review');
              }}
              onTakeKept={handleTakeKept}
            />
          </div>
        )}

        {routeInfo.route === 'cleared' && (
          <div className="cleared-page-wrapper">
            <RoundClearedScreen
              onBackToReview={() => {
                setFocusFlagId(null);
                navigate('#/review');
              }}
              onNotify={(msg) => setToastMessage(msg)}
            />
          </div>
        )}
      </main>

      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />

      {isPostCallStage && <DemoControlsPanel />}
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
