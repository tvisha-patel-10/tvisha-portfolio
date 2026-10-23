import React, { useState, useEffect } from 'react';
import { useDemo } from '../../state/DemoContext';
import { logEvent } from '../../lib/analytics';
import { CheckIcon, LightbulbIcon } from '../common/Icons';
import './RoundClearedScreen.css';

interface RoundClearedScreenProps {
  onBackToReview: () => void;
  onNotify?: (msg: string) => void;
}

export const RoundClearedScreen: React.FC<RoundClearedScreenProps> = ({
  onBackToReview,
  onNotify
}) => {
  const { state, activeFlags } = useDemo();
  const [showReviewChanged, setShowReviewChanged] = useState<boolean>(false);

  useEffect(() => {
    logEvent('round_cleared');
  }, []);

  // Carry forward tips: one tip each from your fixed flags per SPEC §4 S5
  const myFixedFlags = activeFlags.filter(
    (f) => f.fixBy === state.viewAs && (state.flagsState[f.id] === 'fixed' || state.takes[f.id]?.keptTake)
  );

  // Default carry-forward tips if user views cleared directly
  const carryForwardTips = myFixedFlags.length > 0
    ? myFixedFlags.map((f) => ({
        id: f.id,
        title: f.title,
        tip: f.goal || f.reason
      }))
    : [
        state.viewAs === 'Assistant'
          ? {
              id: 'F1',
              title: 'Tool execution timing',
              tip: 'Wait for the result before reading it.'
            }
          : {
              id: 'F3',
              title: 'Emotional progression',
              tip: 'Start frustrated that plans changed so your relief has room to land.'
            }
      ];

  // All fixed/resolved flags for before/after review chips
  const allResolvedFlags = activeFlags.filter(
    (f) => state.flagsState[f.id] === 'fixed' || state.takes[f.id]?.keptTake
  );

  return (
    <div className="round-cleared-layout">
      {/* S5 Cleared Banner */}
      <section className="cleared-hero-card" role="status" aria-label="Round 1 cleared confirmation">
        <div className="cleared-hero-badge">
          <span className="cleared-icon" aria-hidden="true">
            <CheckIcon size={18} />
          </span>
          <span className="cleared-label">Looks good</span>
        </div>

        <h1 tabIndex={-1} className="cleared-title">Round 1 looks good.</h1>
        <p className="cleared-subtitle">Nothing left we'd flag in Round 1.</p>

        <p className="cleared-standing-line">
          This is an automated preview. A human reviewer makes the final call. A reviewer will listen to the final version.
        </p>
      </section>

      {/* Carry Forward Card per SPEC §4 S5 & §9 */}
      <section className="carry-forward-card" aria-labelledby="carry-forward-heading">
        <div className="carry-header">
          <span className="carry-icon" aria-hidden="true">
            <LightbulbIcon size={20} />
          </span>
          <div>
            <span className="carry-eyebrow">One thing to keep for Round 2</span>
            <h3 id="carry-forward-heading" className="carry-title">Carry Forward</h3>
          </div>
        </div>

        <div className="carry-tips-list">
          {carryForwardTips.map((item) => (
            <div key={item.id} className="carry-tip-bubble">
              <span className="tip-moment-tag">{item.title}:</span>
              <p className="tip-content-text">"{item.tip}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review What Changed Drawer/Section with Before/After chips per SPEC §4 S5 */}
      {showReviewChanged && (
        <section className="review-changed-card" aria-label="Review of modifications made during redo">
          <h4>Review what changed in Round 1</h4>
          <div className="changed-chips-grid">
            {allResolvedFlags.map((f) => (
              <div key={f.id} className="changed-moment-chip">
                <span className="changed-badge-before">Before: Open</span>
                <span aria-hidden="true">→</span>
                <span className="changed-badge">After: Fixed</span>
                <span className="changed-title">{f.title}</span>
                <span className="changed-owner">({f.fixBy === state.viewAs ? 'You' : 'Partner'})</span>
              </div>
            ))}
            {allResolvedFlags.length === 0 && (
              <p className="no-changes-text">No redo takes were substituted in this round.</p>
            )}
          </div>
        </section>
      )}

      {/* Primary & Secondary Actions per SPEC §4 S5 */}
      <div className="cleared-actions-bar">
        <button
          type="button"
          className="btn btn-primary btn-round2"
          onClick={() => {
            if (onNotify) {
              onNotify('Round 2 is outside the scope of this Round 1 demo.');
            }
          }}
        >
          Start Round 2 →
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowReviewChanged((prev) => !prev)}
        >
          {showReviewChanged ? 'Hide changes' : 'Review what changed'}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBackToReview}
        >
          Back to review
        </button>
      </div>
    </div>
  );
};
