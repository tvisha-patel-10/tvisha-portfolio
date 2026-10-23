import React from 'react';
import type { ReviewStatus } from '../../types';
import { CheckIcon, AlertTriangleIcon, CloseIcon } from '../common/Icons';
import './StatusCard.css';

interface StatusCardProps {
  status: ReviewStatus;
  summary: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ status, summary }) => {
  const getIconAndClass = () => {
    switch (status) {
      case 'Looks good':
        return {
          icon: <CheckIcon size={16} />,
          className: 'status-looks-good'
        };
      case 'Likely to be flagged':
        return {
          icon: <AlertTriangleIcon size={16} />,
          className: 'status-likely-flagged'
        };
      case 'Likely to fail':
        return {
          icon: <CloseIcon size={16} />,
          className: 'status-likely-fail'
        };
    }
  };

  const { icon, className } = getIconAndClass();

  return (
    <section
      id="status-card"
      tabIndex={-1}
      className={`status-card ${className}`}
      role="status"
      aria-label="Round review status"
    >
      <div className="status-header">
        <div className="status-badge-wrapper">
          <span className="status-icon" aria-hidden="true">{icon}</span>
          <span className="status-label">{status}</span>
        </div>
      </div>

      <p className="status-summary">{summary}</p>

      <p className="status-standing-line">
        This is an automated preview. A human reviewer makes the final call.
      </p>
    </section>
  );
};
