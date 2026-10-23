import React, { useState, useRef, useEffect } from 'react';
import type { ReviewStatus, Scenario } from '../../types';
import { CloseIcon, HeadphonesIcon } from '../common/Icons';
import './ActionBar.css';

interface ActionBarProps {
  status: ReviewStatus;
  scenario: Scenario;
  unresolvedOwnCount: number;
  polishCount?: number;
  partnerName: string;
  isPartnerPending: boolean;
  isPartnerSubmittedAsIs?: boolean;
  onFixPrimary: () => void;
  onSubmitWithoutFixing: () => void;
  onSubmitRound: () => void;
  onHearWholeRound: () => void;
  onRecordAgain?: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  status,
  scenario,
  unresolvedOwnCount,
  polishCount = 0,
  partnerName,
  isPartnerPending,
  isPartnerSubmittedAsIs,
  onFixPrimary,
  onSubmitWithoutFixing,
  onSubmitRound,
  onHearWholeRound,
  onRecordAgain
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Determine Primary Action
  const renderPrimaryAction = (isMobile = false) => {
    const btnClass = isMobile ? 'btn btn-primary action-btn-mobile-primary' : 'btn btn-primary';

    if (scenario === 'likely_to_fail' || status === 'Likely to fail') {
      return (
        <button
          type="button"
          className={btnClass}
          onClick={onRecordAgain}
        >
          Record Round 1 again with {partnerName}
        </button>
      );
    }

    if (scenario === 'looks_good' || status === 'Looks good') {
      return (
        <button
          type="button"
          className={btnClass}
          onClick={onSubmitRound}
        >
          Submit round
        </button>
      );
    }

    if (unresolvedOwnCount > 0) {
      return (
        <button
          type="button"
          className={btnClass}
          onClick={onFixPrimary}
        >
          Fix {unresolvedOwnCount} {unresolvedOwnCount === 1 ? 'moment' : 'moments'} (about 1 min)
        </button>
      );
    }

    if (isPartnerPending) {
      if (isPartnerSubmittedAsIs) {
        return (
          <button
            type="button"
            className={btnClass}
            onClick={onSubmitRound}
          >
            Submit round
          </button>
        );
      }

      return (
        <button
          type="button"
          className={btnClass}
          disabled
          aria-disabled="true"
        >
          Waiting for {partnerName}…
        </button>
      );
    }

    return (
      <button
        type="button"
        className={btnClass}
        onClick={onSubmitRound}
      >
        Submit round
      </button>
    );
  };

  // Determine Secondary Action
  const renderSecondaryAction = (onActionTaken?: () => void) => {
    const handleAction = (fn: () => void) => {
      fn();
      if (onActionTaken) onActionTaken();
    };

    if (scenario === 'likely_to_fail' || status === 'Likely to fail') {
      return (
        <button
          type="button"
          className="btn btn-secondary action-menu-item"
          onClick={() => handleAction(onSubmitWithoutFixing)}
        >
          Submit anyway
        </button>
      );
    }

    if (scenario === 'looks_good' || status === 'Looks good') {
      const countToPolish = unresolvedOwnCount > 0 ? unresolvedOwnCount : polishCount;
      if (countToPolish > 0) {
        return (
          <button
            type="button"
            className="btn btn-secondary action-menu-item"
            onClick={() => handleAction(onFixPrimary)}
          >
            Polish {countToPolish} {countToPolish === 1 ? 'moment' : 'moments'} (optional)
          </button>
        );
      }
      return null;
    }

    if (unresolvedOwnCount > 0) {
      return (
        <button
          type="button"
          className="btn btn-secondary action-menu-item"
          onClick={() => handleAction(onSubmitWithoutFixing)}
        >
          Submit without fixing
        </button>
      );
    }

    if (isPartnerPending) {
      if (isPartnerSubmittedAsIs) {
        return (
          <button
            type="button"
            className="btn btn-secondary action-menu-item"
            onClick={() => handleAction(onFixPrimary)}
          >
            Review those moments
          </button>
        );
      }

      return (
        <button
          type="button"
          className="btn btn-secondary action-menu-item"
          onClick={() => handleAction(onSubmitWithoutFixing)}
        >
          Submit without waiting
        </button>
      );
    }

    return null;
  };

  return (
    <footer className="action-bar-container" role="region" aria-label="Review actions">
      <div className="action-bar-content">
        {/* Desktop Layout */}
        <div className="action-bar-info desktop-only">
          <p className="redo-unpaid-text">
            Moments you fix won't be held against this round's 7 credits.
          </p>
        </div>

        <div className="action-bar-buttons desktop-only">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onHearWholeRound}
            title="Start simulated playback from the beginning"
          >
            Hear whole round
          </button>
          {renderSecondaryAction()}
          {renderPrimaryAction()}
        </div>

        {/* Mobile Compact Layout */}
        <div className="action-bar-mobile-row mobile-only">
          <div className="mobile-primary-action">
            {renderPrimaryAction(true)}
          </div>

          <div className="mobile-menu-wrapper">
            <button
              ref={menuButtonRef}
              type="button"
              className={`btn btn-secondary mobile-menu-trigger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="More actions"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <span className="menu-icon" aria-hidden="true">⋯</span>
              <span className="menu-label">More</span>
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="mobile-actions-dropdown"
                role="menu"
                aria-label="Additional actions"
              >
                <div className="dropdown-header">
                  <span>Additional Actions</span>
                  <button
                    type="button"
                    className="dropdown-close-btn"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                <div className="dropdown-items">
                  <button
                    type="button"
                    className="btn btn-secondary action-menu-item"
                    onClick={() => {
                      onHearWholeRound();
                      setIsMenuOpen(false);
                    }}
                  >
                    <HeadphonesIcon size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                    Hear whole round
                  </button>

                  {renderSecondaryAction(() => setIsMenuOpen(false))}
                </div>

                <div className="dropdown-footer">
                  <p className="redo-unpaid-text-dropdown">
                    Moments you fix won't be held against this round's 7 credits.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
