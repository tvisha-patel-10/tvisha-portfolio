import React from 'react';
import type { Flag, FlagStatus, Role } from '../../types';
import { FlowIcon, StarIcon, SpeakerIcon } from '../common/Icons';
import './FlagRow.css';

interface FlagRowProps {
  flag: Flag;
  status: FlagStatus;
  currentRole: Role;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onFix: () => void;
}

export const FlagRow: React.FC<FlagRowProps> = ({
  flag,
  status,
  currentRole,
  index,
  isExpanded,
  onToggleExpand,
  onFix
}) => {
  const isFixer = flag.fixBy === currentRole;
  const partnerName = currentRole === 'User' ? 'Dave' : 'Maya';

  // Resolved owner tag relative to current role
  let ownerTag = 'Both';
  if (flag.owner === currentRole) {
    ownerTag = 'You';
  } else if (flag.owner !== 'Both') {
    ownerTag = 'Partner';
  }

  // Format timestamp 0:31 – 0:36
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const timeRange = `${formatTime(flag.start)}–${formatTime(flag.end)}`;

  // Bucket icons
  const getBucketIcon = () => {
    switch (flag.bucket) {
      case 'Flow':
        return <FlowIcon size={14} />;
      case 'Role':
        return <StarIcon size={14} />;
      case 'Audio':
        return <SpeakerIcon size={14} />;
    }
  };

  // State chip
  const renderStateChip = () => {
    if (status === 'fixed') {
      return <span className="chip chip-fixed">Fixed</span>;
    }
    if (status === 'skipped') {
      return <span className="chip chip-skipped">Skipped</span>;
    }
    if (!flag.fixable) {
      return <span className="chip chip-unfixable">Unfixable</span>;
    }
    if (!isFixer) {
      return <span className="chip chip-partner">{partnerName} is fixing</span>;
    }
    return <span className="chip chip-open">Open</span>;
  };

  return (
    <article
      className={`flag-row ${isExpanded ? 'is-expanded' : ''}`}
      aria-labelledby={`flag-title-${flag.id}`}
    >
      <div
        id={`flag-row-${flag.id}`}
        className="flag-row-main"
        onClick={onToggleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand();
          }
        }}
      >
        <div className="flag-row-left">
          <span className="flag-number-badge">{index + 1}</span>
          <span className="flag-bucket-icon" aria-hidden="true" title={flag.bucket}>
            {getBucketIcon()}
          </span>
          <div className="flag-titles">
            <h4 id={`flag-title-${flag.id}`} className="flag-title">
              {flag.title}
            </h4>
            <div className="flag-meta">
              <span className="flag-time">{timeRange}</span>
              <span className="meta-bullet" aria-hidden="true">•</span>
              <span className="flag-owner-tag">{ownerTag}</span>
            </div>
          </div>
        </div>

        <div className="flag-row-right">
          {renderStateChip()}
          {isFixer && status !== 'fixed' && flag.fixable && (
            <button
              type="button"
              className="btn btn-primary btn-sm fix-btn"
              onClick={(e) => {
                e.stopPropagation();
                onFix();
              }}
            >
              Fix this moment
            </button>
          )}
          <span className="expand-indicator" aria-hidden="true">
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="flag-details" id={`flag-desc-${flag.id}`}>
          <div className="flag-reason">
            <strong>Why it was flagged:</strong>
            <p>{flag.reason}</p>
          </div>

          {/* Coaching goal shown only to the fixer per SPEC §2 & §18 */}
          {isFixer && flag.goal && (
            <div className="flag-goal">
              <strong>What to aim for:</strong>
              <p>{flag.goal}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
