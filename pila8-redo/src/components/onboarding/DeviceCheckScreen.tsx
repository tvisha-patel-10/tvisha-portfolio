import React, { useState } from 'react';
import './DeviceCheckScreen.css';

interface DeviceCheckScreenProps {
  onJoinLobby: () => void;
  onBack: () => void;
}

export const DeviceCheckScreen: React.FC<DeviceCheckScreenProps> = ({ onJoinLobby, onBack }) => {
  const [micActive] = useState(true);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const handleTestSpeaker = () => {
    setIsPlayingTest(true);
    setTimeout(() => setIsPlayingTest(false), 1500);
  };

  return (
    <div className="device-check-container">
      <button type="button" className="back-nav-btn" onClick={onBack}>
        ‹ Back to guide
      </button>

      <div className="device-check-card">
        <h1 tabIndex={-1} className="device-title">Device Check</h1>
        <p className="device-subtitle">
          Make sure your microphone and speakers are working before joining.
        </p>
        <p className="device-guideline">
          Please make sure you are using a headset with a microphone and headphone for recording. Low quality audios that include excessive clipping and plosives will not be accepted.
        </p>

        {/* Microphone Box */}
        <div className="hardware-box">
          <label htmlFor="mic-select" className="hardware-label">
            Microphone Input
          </label>
          <select id="mic-select" className="device-select" defaultValue="macbook-mic">
            <option value="macbook-mic">MacBook Pro Microphone (Built-in)</option>
            <option value="headset-mic">Headset Microphone (USB)</option>
          </select>

          {/* Dedicated Mic Status Banner */}
          <div className="mic-status-banner" role="status">
            <div className="banner-left">
              <span className={`status-pill ${micActive ? 'active-pill' : ''}`}>
                ● Microphone Active
              </span>
              <span className="meter-label">Input signal healthy</span>
            </div>

            <div className="simulated-mic-meter" aria-hidden="true">
              <div className="meter-wave">
                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
                <span className="dot dot-4"></span>
                <span className="dot dot-5"></span>
                <span className="dot dot-6"></span>
                <span className="dot dot-5"></span>
                <span className="dot dot-4"></span>
                <span className="dot dot-2"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Speaker Box */}
        <div className="hardware-box">
          <label htmlFor="speaker-select" className="hardware-label">
            Speaker Output
          </label>
          <div className="hardware-row">
            <select id="speaker-select" className="device-select" defaultValue="macbook-speakers">
              <option value="macbook-speakers">Default - MacBook Pro Speakers (Built-in)</option>
              <option value="headset-out">Headphones (USB)</option>
            </select>
            <button
              type="button"
              className="test-speaker-btn"
              onClick={handleTestSpeaker}
            >
              {isPlayingTest ? 'Playing Tone…' : 'Test Speaker'}
            </button>
          </div>
        </div>

        {/* Join CTA */}
        <button
          type="button"
          className="btn btn-primary join-lobby-btn"
          onClick={onJoinLobby}
        >
          Join Lobby
        </button>

        <p className="terms-footnote">
          By starting this task, you agree to the <a href="#terms">Voice Contributor Agreement</a>.
        </p>
      </div>
    </div>
  );
};
