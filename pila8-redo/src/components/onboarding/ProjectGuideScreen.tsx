import React from 'react';
import './ProjectGuideScreen.css';
import { HeadphonesIcon, ChatBubbleIcon, CoinIcon, DocumentIcon } from '../common/Icons';

interface ProjectGuideScreenProps {
  onJoinSession: () => void;
}

export const ProjectGuideScreen: React.FC<ProjectGuideScreenProps> = ({ onJoinSession }) => {
  return (
    <div className="pila8-page">
      <header className="pila8-top-row">
        <a href="#/project-guide" className="back-link">
          ‹ Back to categories
        </a>
        <h1 tabIndex={-1} className="project-main-title">Engaging Companion Conversations</h1>
        <p className="project-sub-desc">
          Review category requirements and start your contribution.
        </p>
      </header>

      {/* Top Banner Cards */}
      <div className="banner-grid">
        <div className="banner-card example-card">
          <div className="banner-icon-title">
            <span className="banner-icon" aria-hidden="true">
              <HeadphonesIcon size={22} />
            </span>
            <div>
              <span className="banner-eyebrow">CONVERSATION EXAMPLES</span>
              <h3>Hear what a strong conversation sounds like</h3>
            </div>
          </div>
          <div className="banner-bottom">
            <span className="badge-light">2 examples available</span>
            <button type="button" className="pill-btn orange-pill">
              Open examples ›
            </button>
          </div>
        </div>

        <div className="banner-card help-card">
          <div className="banner-icon-title">
            <span className="banner-icon" aria-hidden="true">
              <ChatBubbleIcon size={22} />
            </span>
            <div>
              <span className="banner-eyebrow">NEED A HAND?</span>
              <h3>Having issues?</h3>
            </div>
          </div>
          <p className="help-text">
            Bring your questions or problems to office hours and get help from the Pila8 team.
          </p>
          <div className="banner-bottom banner-bottom-link">
            <a href="#office-hours" className="office-hours-link">
              Come to office hours ↗
            </a>
          </div>
        </div>
      </div>

      {/* Rate Notice */}
      <div className="rate-notice">
        <span className="rate-badge">
          <CoinIcon size={16} /> Rate: 4 credits / min
        </span>
        <span>
          Earn <strong>4 credits/minute</strong> for each recording. All descriptor fields are required to submit; they help reviewers but do not affect credits.
        </span>
      </div>

      {/* Project Guide Documentation Content */}
      <div className="guide-content-card">
        <div className="guide-section-header">
          <span className="guide-sec-icon" aria-hidden="true">
            <DocumentIcon size={22} />
          </span>
          <h2>Project Guide</h2>
        </div>

        <div className="guide-block">
          <h3>Overview</h3>
          <p>
            You and another participant will record a live conversation based on an assigned scenario. One person plays the User and the other plays the helping Assistant.
          </p>
          <p>
            The conversation should sound like a real person talking to another friend — not a customer-service call, chatbot demo, or script reading.
          </p>
        </div>

        <div className="guide-block">
          <h3>What Good Sounds Like</h3>
          <ul>
            <li>Speak naturally in your own words.</li>
            <li>Keep turns concise and respond to what your partner actually says.</li>
            <li>Both participants must use natural backchannels such as "mhm", "yeah", "okay", or "one sec."</li>
            <li>The User may hesitate, correct themselves, add a forgotten detail, or show mild frustration.</li>
            <li>The Assistant should be capable and conversational, not formal, overly cheerful, or repetitive.</li>
            <li>Do not interrupt unless the scenario deliberately includes a correction or barge-in.</li>
          </ul>
        </div>

        <div className="guide-block">
          <h3>Tool Use Protocol</h3>
          <ul>
            <li>Ask for missing information before calling a tool.</li>
            <li>Briefly acknowledge when a tool is working (e.g. "Let me find that message", "Checking transit").</li>
            <li><strong>Never guess or reveal a result before it appears.</strong></li>
            <li>Explain results naturally instead of reading raw output word for word.</li>
            <li>Confirm completed actions accurately and finish with a natural closing.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Sticky Action to Enter Task */}
      <div className="pila8-bottom-bar">
        <div className="bottom-bar-left">
          <span className="live-status-pill">● System Online</span>
        </div>
        <div className="bottom-bar-actions">
          <button
            type="button"
            className="btn btn-primary join-live-btn"
            onClick={onJoinSession}
          >
            Join Live Matching →
          </button>
        </div>
      </div>
    </div>
  );
};
