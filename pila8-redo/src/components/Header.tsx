import React from 'react';
import './Header.css';

interface HeaderProps {
  currentRoute: 'story' | 'project-guide' | 'device-check' | 'live-session' | 'review' | 'redo' | 'cleared';
  flagId?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, flagId }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        <nav aria-label="Breadcrumbs" className="breadcrumbs">
          <ol>
            <li className="breadcrumb-project">
              <span className="project-title">Engaging Companion Conversations</span>
              <span className="breadcrumb-separator" aria-hidden="true">›</span>
            </li>
            <li className="breadcrumb-round">
              <span>Round 1 of 3</span>
              <span className="breadcrumb-separator" aria-hidden="true">›</span>
            </li>
            <li className="breadcrumb-page" aria-current="page">
              {currentRoute === 'project-guide' && <span>Project Overview</span>}
              {currentRoute === 'device-check' && <span>Device Check</span>}
              {currentRoute === 'live-session' && <span>Live Session</span>}
              {currentRoute === 'review' && <span>Review</span>}
              {currentRoute === 'redo' && <span>Redo {flagId ? `(${flagId})` : ''}</span>}
              {currentRoute === 'cleared' && <span>Round Cleared</span>}
            </li>
          </ol>
        </nav>
      </div>

      <div className="header-right">
        <a href="#/story" className="back-to-process-btn">
          ← Back to process
        </a>
        <span className="demo-badge" aria-label="Demo environment indicator">
          DEMO
        </span>
      </div>
    </header>
  );
};
