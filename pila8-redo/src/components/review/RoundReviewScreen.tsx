import React, { useState, useEffect, useRef } from 'react';
import { useDemo } from '../../state/DemoContext';
import { MOCK_TRANSCRIPT } from '../../data/mock';
import { logEvent } from '../../lib/analytics';
import { StatusCard } from './StatusCard';
import { FlagList } from './FlagList';
import { ActionBar } from './ActionBar';
import { Timeline } from './Timeline';
import { SyncedTranscript } from './SyncedTranscript';
import { PartnerProgressCard } from './PartnerProgressCard';
import { BottomSheetFlagDetail } from './BottomSheetFlagDetail';
import { ConfirmationModal } from '../common/ConfirmationModal';
import './RoundReviewScreen.css';

interface RoundReviewScreenProps {
  onNavigateRedo: (flagId: string) => void;
  onNavigateCleared: () => void;
  onNotify?: (msg: string) => void;
  focusFlagId?: string | null;
}

const TOTAL_ROUND_SECONDS = 105; // 1:45 per SPEC §3

export const RoundReviewScreen: React.FC<RoundReviewScreenProps> = ({
  onNavigateRedo,
  onNavigateCleared,
  onNotify,
  focusFlagId
}) => {
  const { state, dispatch, activeFlags, reviewStatus } = useDemo();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [partnerAnnouncement, setPartnerAnnouncement] = useState<string | null>(null);
  const [bottomSheetFlagId, setBottomSheetFlagId] = useState<string | null>(null);

  // Playhead & simulated playback state
  const [playhead, setPlayhead] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [highlightRange, setHighlightRange] = useState<[number, number] | null>(null);

  const prevStatusRef = useRef(reviewStatus);

  const partnerRole = state.viewAs === 'User' ? 'Assistant' : 'User';
  const partnerName = state.viewAs === 'User' ? 'Dave' : 'Maya';

  const totalUnresolvedAll = activeFlags.filter(
    (f) => (state.flagsState[f.id] ?? 'open') !== 'fixed'
  ).length;

  // Log review_viewed per SPEC §14
  useEffect(() => {
    logEvent('review_viewed', {
      status: reviewStatus,
      openFlags: totalUnresolvedAll
    });
  }, [state.scenario, state.viewAs]);

  // Log status_changed per SPEC §14
  useEffect(() => {
    if (prevStatusRef.current !== reviewStatus) {
      logEvent('status_changed', {
        from: prevStatusRef.current,
        to: reviewStatus
      });
      prevStatusRef.current = reviewStatus;
    }
  }, [reviewStatus]);

  // Simulated playback loop honoring 1x / 4x speed and reduced motion
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const deltaSec = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setPlayhead((prev) => {
          const next = prev + deltaSec * state.playbackSpeed;
          if (next >= TOTAL_ROUND_SECONDS) {
            setIsPlaying(false);
            return TOTAL_ROUND_SECONDS;
          }
          return next;
        });
      }
      animId = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      lastTime = performance.now();
      animId = requestAnimationFrame(tick);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, state.playbackSpeed]);

  // Handle flag selection: seeks to 2s before flag, highlights range on timeline & transcript per SPEC §8
  // On <640px, also open bottom sheet per SPEC §12
  const handleSelectFlag = (flagId: string, isFromTimeline: boolean = false) => {
    const flag = activeFlags.find((f) => f.id === flagId);
    if (!flag) return;

    logEvent('flag_opened', { id: flag.id, bucket: flag.bucket });

    if (window.innerWidth < 640) {
      setBottomSheetFlagId(flagId);
    }

    if (!isFromTimeline && selectedFlagId === flagId) {
      setSelectedFlagId(null);
      setHighlightRange(null);
      return;
    }

    setSelectedFlagId(flagId);
    setHighlightRange([flag.start, flag.end]);
    const seekTarget = Math.max(0, flag.start - 2);
    setPlayhead(seekTarget);

    // Ensure the selected flag card in the moments review panel is scrolled into view smoothly
    requestAnimationFrame(() => {
      const cardEl = document.getElementById(`flag-row-${flagId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };

  // Hear whole round action
  const handleHearWholeRound = () => {
    setPlayhead(0);
    setSelectedFlagId(null);
    setHighlightRange(null);
    setIsPlaying(true);
  };

  // Open flags owned/fixed by current user vs partner
  const ownFixableFlags = activeFlags.filter((f) => f.fixBy === state.viewAs && f.fixable);
  const ownUnresolvedFlags = ownFixableFlags.filter(
    (f) => (state.flagsState[f.id] ?? 'open') !== 'fixed'
  );

  // Partner flags that require fixing (exclude low-severity optional polish items in V1)
  const partnerFlags = activeFlags.filter(
    (f) => f.fixBy === partnerRole && f.fixable && f.severity !== 'low'
  );
  const partnerUnresolvedFlags = partnerFlags.filter(
    (f) => (state.flagsState[f.id] ?? 'open') !== 'fixed'
  );
  const partnerFixedCount = partnerFlags.length - partnerUnresolvedFlags.length;

  const openPolishFlags = activeFlags.filter(
    (f) => f.severity === 'low' && (state.flagsState[f.id] ?? 'open') !== 'fixed'
  );

  // Partner auto-progress simulation per SPEC §4 S4 & §8
  // Complete partner fixes in ~25s of demo time when partnerMode === 'working'
  useEffect(() => {
    // If partnerMode is "completed", fix all remaining partner flags immediately
    if (state.partnerMode === 'completed') {
      partnerUnresolvedFlags.forEach((flag) => {
        dispatch({ type: 'PARTNER_FIX_FLAG', payload: flag.id });
      });
      return;
    }

    if (state.partnerMode !== 'working') return;

    if (partnerUnresolvedFlags.length > 0) {
      // Fix next unresolved partner flag after ~12s per flag (total ~24s for 2 flags)
      const nextFlagToFix = partnerUnresolvedFlags[0];
      const timer = window.setTimeout(() => {
        dispatch({ type: 'PARTNER_FIX_FLAG', payload: nextFlagToFix.id });
        const newFixedCount = partnerFixedCount + 1;
        const msg = `${partnerName} fixed ${newFixedCount} of ${partnerFlags.length} moments`;
        setPartnerAnnouncement(msg);
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, [state.partnerMode, partnerUnresolvedFlags, partnerFixedCount, partnerFlags.length, partnerName, dispatch]);

  const isPartnerPending = partnerUnresolvedFlags.length > 0 && state.partnerMode !== 'skipped';
  const isPartnerSubmittedAsIs = state.partnerMode === 'skipped' && partnerUnresolvedFlags.length > 0;
  const isPolishOnly = state.scenario === 'looks_good' || reviewStatus === 'Looks good';

  // Focus next open flag or status card when returning from a kept take per SPEC §8 & §11
  useEffect(() => {
    if (!focusFlagId) return;
    if (focusFlagId === 'status-card') {
      const statusEl = document.getElementById('status-card');
      statusEl?.focus();
      return;
    }
    const el = document.getElementById(`flag-row-${focusFlagId}`);
    if (el) {
      el.focus();
    }
  }, [focusFlagId]);

  // Compute summary copy per SPEC §9 and §18
  const getSummaryText = () => {
    if (state.scenario === 'likely_to_fail' || reviewStatus === 'Likely to fail') {
      return "A reviewer would likely send this round back, and a quick fix won't cover it.";
    }

    if (reviewStatus === 'Looks good') {
      return "Nothing here we'd flag.";
    }

    if (ownUnresolvedFlags.length === 0 && partnerUnresolvedFlags.length > 0) {
      if (state.partnerMode === 'skipped') {
        return `${partnerName} is submitting as is. ${partnerUnresolvedFlags.length} ${
          partnerUnresolvedFlags.length === 1 ? 'moment stays' : 'moments stay'
        } open.`;
      }
      return `Your moments are fixed. Waiting on ${partnerName} for ${partnerUnresolvedFlags.length} more.`;
    }

    return `A few moments could get this round sent back. You can fix ${ownUnresolvedFlags.length} of them yourself in about 1 min.`;
  };

  const handleFixPrimary = () => {
    if (ownUnresolvedFlags.length > 0) {
      onNavigateRedo(ownUnresolvedFlags[0].id);
      return;
    }
    // If partner submitted as is ("Review those moments") or viewing V1 polish as non-owner:
    const targetFlag = partnerUnresolvedFlags[0] || openPolishFlags[0];
    if (targetFlag) {
      setSelectedFlagId(targetFlag.id);
      setHighlightRange([targetFlag.start, targetFlag.end]);
      setPlayhead(Math.max(0, targetFlag.start - 2));
      const rowEl = document.getElementById(`flag-row-${targetFlag.id}`);
      rowEl?.focus();
    }
  };

  const modalOpenCount =
    ownUnresolvedFlags.length > 0 ? ownUnresolvedFlags.length : totalUnresolvedAll;

  return (
    <div className="review-screen-layout">
      {/* S1 Header / Status Card */}
      <StatusCard status={reviewStatus} summary={getSummaryText()} />

      {/* Main Review Content: Split layout with timeline & synced transcript on left, flag list on right */}
      <div className="review-grid">
        <div className="review-left-col">
          <Timeline
            totalDuration={TOTAL_ROUND_SECONDS}
            playhead={playhead}
            isPlaying={isPlaying}
            playbackSpeed={state.playbackSpeed}
            currentRole={state.viewAs}
            flags={activeFlags}
            turns={MOCK_TRANSCRIPT}
            selectedFlagId={selectedFlagId}
            highlightRange={highlightRange}
            onSeek={(secs) => setPlayhead(secs)}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            onSelectFlag={(id) => handleSelectFlag(id, true)}
          />

          <SyncedTranscript
            turns={MOCK_TRANSCRIPT}
            currentPlayhead={playhead}
            highlightRange={highlightRange}
            currentRole={state.viewAs}
            onTurnClick={(secs) => {
              setPlayhead(secs);
            }}
          />
        </div>

        <div className="review-right-col">
          <FlagList
            flags={activeFlags}
            flagsState={state.flagsState}
            currentRole={state.viewAs}
            selectedFlagId={selectedFlagId}
            onSelectFlag={(id) => handleSelectFlag(id, false)}
            onFixFlag={onNavigateRedo}
            isOptionalPolishOnly={isPolishOnly}
          />

          {/* Partner Progress Card per SPEC §4 S4 */}
          <PartnerProgressCard
            partnerName={partnerName}
            partnerRole={partnerRole}
            totalPartnerFlags={partnerFlags.length}
            fixedPartnerFlags={partnerFixedCount}
            partnerMode={state.partnerMode}
          />
        </div>
      </div>

      {/* Screen reader announcement for partner updates per SPEC §11 */}
      <div className="sr-only" role="status" aria-live="polite">
        {partnerAnnouncement}
      </div>

      {/* Sticky Action Bar */}
      <ActionBar
        status={reviewStatus}
        scenario={state.scenario}
        unresolvedOwnCount={ownUnresolvedFlags.length}
        polishCount={openPolishFlags.length}
        partnerName={partnerName}
        isPartnerPending={isPartnerPending}
        isPartnerSubmittedAsIs={isPartnerSubmittedAsIs}
        onFixPrimary={handleFixPrimary}
        onSubmitWithoutFixing={() => setIsSubmitModalOpen(true)}
        onSubmitRound={onNavigateCleared}
        onHearWholeRound={handleHearWholeRound}
        onRecordAgain={() => {
          dispatch({ type: 'RESET_DEMO' });
          if (onNotify) {
            onNotify(`Starting a fresh Round 1 with ${partnerName}`);
          }
        }}
      />

      {/* Submit Without Fixing Confirmation Dialog per SPEC §8 & §11 */}
      <ConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          logEvent('submit_without_fixing', { openFlags: totalUnresolvedAll });
          setIsSubmitModalOpen(false);
          onNavigateCleared();
        }}
        title="Submit without fixing?"
        message={
          state.scenario === 'likely_to_fail' || reviewStatus === 'Likely to fail'
            ? 'The connection broke for 22 seconds between 0:50 and 1:12. A reviewer will likely send this round back if submitted as is.'
            : `Submit with ${modalOpenCount} ${
                modalOpenCount === 1 ? 'moment' : 'moments'
              } still open? A reviewer may flag them. You can fix them now instead.`
        }
        confirmLabel="Submit anyway"
        cancelLabel={
          state.scenario === 'likely_to_fail' || reviewStatus === 'Likely to fail'
            ? 'Go back'
            : 'Fix them now'
        }
      />

      {/* Mobile Bottom Sheet Flag Detail per SPEC §12 (<640px) */}
      <BottomSheetFlagDetail
        flag={activeFlags.find((f) => f.id === bottomSheetFlagId) || null}
        status={bottomSheetFlagId ? (state.flagsState[bottomSheetFlagId] ?? 'open') : 'open'}
        currentRole={state.viewAs}
        isOpen={Boolean(bottomSheetFlagId)}
        onClose={() => setBottomSheetFlagId(null)}
        onFix={onNavigateRedo}
      />
    </div>
  );
};
