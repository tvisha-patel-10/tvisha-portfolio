import React, { useEffect, useRef } from 'react';
import type { Flag, FlagStatus, Role } from '../../types';
import { CloseIcon } from '../common/Icons';
import './BottomSheetFlagDetail.css';

interface BottomSheetFlagDetailProps {
  flag: Flag | null;
  status: FlagStatus;
  currentRole: Role;
  isOpen: boolean;
  onClose: () => void;
  onFix: (flagId: string) => void;
}

export const BottomSheetFlagDetail: React.FC<BottomSheetFlagDetailProps> = ({
  flag,
  status,
  currentRole,
  isOpen,
  onClose,
  onFix
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !flag) return null;

  const isFixer = flag.fixBy === currentRole;
  const partnerName = currentRole === 'User' ? 'Dave' : 'Maya';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose} role="presentation">
      <div
        ref={sheetRef}
        className="bottom-sheet-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-flag-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-drag-handle" aria-hidden="true" />

        <div className="sheet-header">
          <div className="sheet-meta">
            <span className="sheet-bucket">{flag.bucket}</span>
            <span className="meta-bullet">•</span>
            <span className="sheet-time">{formatTime(flag.start)}–{formatTime(flag.end)}</span>
            <span className="meta-bullet">•</span>
            <span className="sheet-owner">{flag.owner === currentRole ? 'You' : flag.owner === 'Both' ? 'Both' : 'Partner'}</span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <h3 id="sheet-flag-title" className="sheet-title">{flag.title}</h3>

        <div className="sheet-body">
          <div className="sheet-reason">
            <strong>Why it was flagged:</strong>
            <p>{flag.reason}</p>
          </div>

          {/* Coaching goal shown only to the fixer */}
          {isFixer && flag.goal && (
            <div className="sheet-goal">
              <strong>What to aim for:</strong>
              <p>{flag.goal}</p>
            </div>
          )}

          {!isFixer && (
            <p className="sheet-partner-note">
              {partnerName} is assigned to fix this moment.
            </p>
          )}
        </div>

        <div className="sheet-actions">
          {isFixer && status !== 'fixed' && flag.fixable && (
            <button
              type="button"
              className="btn btn-primary sheet-fix-btn"
              onClick={() => {
                onClose();
                onFix(flag.id);
              }}
            >
              Fix this moment →
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary sheet-dismiss-btn"
            onClick={onClose}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
