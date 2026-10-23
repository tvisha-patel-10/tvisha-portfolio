import React from 'react';
import type { PartnerSimMode } from '../../types';
import './PartnerProgressCard.css';

interface PartnerProgressCardProps {
  partnerName: string;
  partnerRole: string;
  totalPartnerFlags: number;
  fixedPartnerFlags: number;
  partnerMode: PartnerSimMode;
}

export const PartnerProgressCard: React.FC<PartnerProgressCardProps> = ({
  partnerName,
  partnerRole,
  totalPartnerFlags,
  fixedPartnerFlags,
  partnerMode
}) => {
  if (totalPartnerFlags === 0) return null;

  const isCompleted = fixedPartnerFlags >= totalPartnerFlags;
  const isSkipped = partnerMode === 'skipped';

  const renderStatusChip = () => {
    if (isSkipped) {
      return <span className="chip chip-skipped">Submitted as is</span>;
    }
    if (isCompleted) {
      return <span className="chip chip-fixed">All moments fixed</span>;
    }
    if (partnerMode === 'paused') {
      return <span className="chip chip-partner">Paused</span>;
    }
    return (
      <span className="chip chip-open">
        {partnerName} has fixed {fixedPartnerFlags} of {totalPartnerFlags}
      </span>
    );
  };

  return (
    <section className="partner-progress-card" aria-label={`Partner progress for ${partnerName}`}>
      <div className="partner-card-header">
        <div className="partner-avatar-info">
          <span className="partner-avatar" aria-hidden="true">
            {partnerName.charAt(0)}
          </span>
          <div>
            <h4 className="partner-card-name">{partnerName} ({partnerRole})</h4>
            <span className="partner-subtitle">Working on their assigned moments</span>
          </div>
        </div>
        {renderStatusChip()}
      </div>

      <div className="partner-progress-bar-track" aria-hidden="true">
        <div
          className="partner-progress-bar-fill"
          style={{
            width: isSkipped ? '100%' : `${(fixedPartnerFlags / totalPartnerFlags) * 100}%`,
            backgroundColor: isSkipped ? '#9CA3AF' : isCompleted ? 'var(--good)' : 'var(--brand)'
          }}
        />
      </div>

      <p className="partner-reassurance-note">
        {isSkipped
          ? `${partnerName} chose to submit without fixing remaining moments.`
          : isCompleted
          ? `All of ${partnerName}'s moments are resolved.`
          : `Async fixes: partner doesn't need to be live with you. Re-recordings are independent.`}
      </p>
    </section>
  );
};
