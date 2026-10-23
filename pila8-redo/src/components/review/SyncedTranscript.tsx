import React from 'react';
import type { Turn, Role } from '../../types';
import './SyncedTranscript.css';

interface SyncedTranscriptProps {
  turns: Turn[];
  currentPlayhead: number;
  highlightRange: [number, number] | null;
  currentRole: Role;
  onTurnClick: (seconds: number) => void;
}

export const SyncedTranscript: React.FC<SyncedTranscriptProps> = ({
  turns,
  currentPlayhead,
  highlightRange,
  currentRole,
  onTurnClick
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getSpeakerLabel = (who: Turn['who']) => {
    if (who === 'TOOL') return 'TOOL EVENT';
    if (currentRole === 'User') {
      return who === 'U' ? 'You (Maya)' : 'Partner (Dave)';
    } else {
      return who === 'A' ? 'You (Dave)' : 'Partner (Maya)';
    }
  };

  return (
    <section className="synced-transcript-container" aria-label="Synchronized conversation transcript">
      <div className="transcript-header">
        <h3 className="transcript-title">Conversation Transcript</h3>
        <span className="transcript-note">Click any turn to jump playhead</span>
      </div>

      <div className="transcript-turns-list" role="feed" aria-busy="false">
        {turns.map((turn) => {
          const isActive = currentPlayhead >= turn.t && currentPlayhead < turn.end;
          const isInHighlightRange =
            highlightRange !== null &&
            turn.t < highlightRange[1] &&
            turn.end > highlightRange[0];

          return (
            <article
              key={turn.id}
              className={`transcript-turn-item ${isActive ? 'turn-active' : ''} ${
                isInHighlightRange ? 'turn-range-highlight' : ''
              } ${turn.who === 'TOOL' ? 'turn-tool' : ''}`}
              onClick={() => onTurnClick(turn.t)}
              tabIndex={0}
              role="article"
              aria-current={isActive ? 'time' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTurnClick(turn.t);
                }
              }}
            >
              <div className="turn-meta">
                <span className="turn-timestamp">{formatTime(turn.t)}</span>
                <span className="turn-speaker-pill">{getSpeakerLabel(turn.who)}</span>
                {isActive && <span className="now-playing-indicator">● Playing</span>}
              </div>

              <p className="turn-body-text">{turn.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
