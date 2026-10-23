import React, { useState } from 'react';
import { MOCK_TRANSCRIPT } from '../../data/mock';
import { LockIcon, ClipboardIcon, LightningIcon, LightbulbIcon, ShieldIcon } from '../common/Icons';
import './LiveSessionScreen.css';

interface LiveSessionScreenProps {
  onEndCall: () => void;
}

export const LiveSessionScreen: React.FC<LiveSessionScreenProps> = ({ onEndCall }) => {
  const partnerReady = true;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="live-session-page">
      {/* Top Live Mic Monitoring Banner per user request */}
      <aside className="live-mic-banner" role="status" aria-live="polite" aria-label="Microphone and session monitoring">
        <div className="mic-banner-left">
          <span className="rec-dot" aria-hidden="true">●</span>
          <span className="rec-label">CAPTURE ACTIVE</span>
        </div>

        <div className="mic-banner-meters">
          <span className="meter-badge green">Noise: Low</span>
          <span className="meter-badge green">Voice: On target</span>
          <span className="meter-room-tone">Room tone steady</span>
        </div>

        <div className="mic-banner-action desktop-only">
          <button
            type="button"
            className="btn btn-primary exit-btn"
            onClick={onEndCall}
          >
            End Call & Open Review →
          </button>
        </div>
      </aside>

      {/* Header Row */}
      <div className="session-header-row">
        <div className="scenario-card">
          <span className="card-label">SCENARIO • SHARED • YOU BOTH SEE THIS</span>
          <h1 tabIndex={-1}>Work, Family, Travel, Health, and Community</h1>
        </div>

        <div className="session-status-badge-card">
          <div className="round-pill">Round 1 of 3</div>
          <div className="role-tag-pill">You're the User (Maya)</div>
        </div>
      </div>

      {/* Private Role Box */}
      <div className="private-role-card">
        <div className="private-role-header">
          <span className="role-lock-icon" aria-hidden="true">
            <LockIcon size={16} />
          </span>
          <strong>YOUR PRIVATE ROLE</strong>
          <span className="only-you-pill">Only you see this</span>
          <span className="tone-pill">Required tone: Frustrated, then relieved</span>
        </div>
        <div className="role-goal-content">
          <span className="user-goal-label">USER GOAL:</span>
          <p>Your cousin moved dinner across town, and you need a simpler way to get there.</p>
        </div>
      </div>

      {/* Main Split Layout: Live Conversation Feed on Left, Tips & Guidelines on Right */}
      <div className="live-session-grid">
        <div className="walkthrough-col">
          <div className="walkthrough-card">
            <div className="walkthrough-header">
              <span className="walkthrough-icon" aria-hidden="true">
                <ClipboardIcon size={18} />
              </span>
              <h3>Live Conversation & Tool Feed</h3>
              <span className="partner-status-tag">
                {partnerReady ? '● Partner Connected (Dave)' : 'Waiting for Dave…'}
              </span>
            </div>

            <div className="script-turns">
              {MOCK_TRANSCRIPT.slice(0, 10).map((turn, idx) => (
                <div
                  key={turn.id}
                  className={`script-turn ${idx === activeStep ? 'active-turn' : ''} ${
                    turn.who === 'TOOL' ? 'tool-turn' : ''
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="turn-speaker">
                    {turn.who === 'U' ? (
                      'YOU - USER'
                    ) : turn.who === 'A' ? (
                      'ASSISTANT (DAVE)'
                    ) : (
                      <>
                        <LightningIcon size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />
                        TOOL EVENT
                      </>
                    )}
                  </span>
                  <p className="turn-text">{turn.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Conversation Tips & Guidelines */}
        <div className="guidelines-col">
          <details className="side-card tips-card tips-collapsible" open>
            <summary className="tips-summary">
              <h4>
                <LightbulbIcon size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
                Conversation Tips & Guidelines
              </h4>
              <span className="summary-indicator" aria-hidden="true">▾</span>
            </summary>
            <ul>
              <li>Speak naturally — don't read rigidly from a script.</li>
              <li>Ask follow-up questions and react to each other.</li>
              <li>Speak clearly at a steady volume.</li>
              <li>Keep it flowing — avoid long unnatural pauses.</li>
              <li>Share the airtime — keep it balanced.</li>
            </ul>
          </details>

          <div className="side-card guardrails-card desktop-only">
            <h4>
              <ShieldIcon size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
              Review Preview Warning
            </h4>
            <p>
              When this live call ends, an automated review will preview what human reviewers would flag before final submission.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky End Call Bar (Compact) */}
      <footer className="live-mobile-action-bar mobile-only">
        <button
          type="button"
          className="btn btn-primary exit-btn-mobile"
          onClick={onEndCall}
        >
          End Call & Open Review →
        </button>
      </footer>
    </div>
  );
};
