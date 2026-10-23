import React, { useState, useEffect } from 'react';
import './ProcessPage.css';

// Config constant from PROCESS_CONTENT.md line 5
export const ACTIVE_TIME = "about 3 hours";

const SECTIONS = [
  { id: 'section-1', title: '1. The problem and what I didn\'t know' },
  { id: 'section-2', title: '2. Hypotheses' },
  { id: 'section-3', title: '3. Five directions' },
  { id: 'section-4', title: '4. How I scored them' },
  { id: 'section-5', title: '5. Why E, and the tradeoffs' },
  { id: 'section-6', title: '6. What I\'d test next' },
  { id: 'section-7', title: '7. Known gaps' }
];

export const ProcessPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('section-1');
  const [eImgFailed, setEImgFailed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently at the reading line (e.g. 120px below top)
      const topOffset = 120;
      let currentSection = SECTIONS[0].id;

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is at or above the offset, and bottom is below the offset
          if (rect.top <= topOffset && rect.bottom > topOffset) {
            currentSection = sec.id;
            break;
          } else if (rect.top <= topOffset) {
            // Keep as candidate if we scrolled past its top
            currentSection = sec.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="process-page-container">
      {/* Sticky Top Bar per user requirement */}
      <header className="process-top-bar" role="banner">
        <div className="process-bar-left">
          <nav className="mode-segmented-switch" aria-label="Page mode">
            <a href="#/story" className="mode-switch-btn active" aria-current="page">
              Process
            </a>
            <a href="#/project-guide" className="mode-switch-btn">
              Demo
            </a>
          </nav>
        </div>
        <div className="process-bar-right">
          <a href="#/project-guide" className="skip-to-demo-link">
            Skip to demo →
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="process-hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title" tabIndex={-1} className="hero-title">
            From "half of submissions fail" to a fixable moment
          </h1>
          <p className="hero-subtitle">
            A four-hour design exploration of Pila8 conversation quality. The process first, then the working demo.
          </p>

          <div className="hero-meta-chips" aria-label="Process metadata">
            <span className="meta-chip">{ACTIVE_TIME} of active work</span>
            <span className="meta-chip-sep" aria-hidden="true">·</span>
            <span className="meta-chip">No rejection data</span>
            <span className="meta-chip-sep" aria-hidden="true">·</span>
            <span className="meta-chip">Worked from screenshots and a product walkthrough</span>
          </div>

          <div className="hero-cta-wrap">
            <a href="#/project-guide" className="btn btn-primary hero-demo-btn">
              Open the working demo →
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Sticky Side Index + Content */}
      <div className="process-layout-grid">
        {/* Sticky Desktop Side Index */}
        <aside className="process-side-nav" aria-label="Table of contents">
          <div className="side-nav-sticky">
            <h2 className="side-nav-heading">Contents</h2>
            <nav>
              <ul className="side-nav-list">
                {SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className={`side-nav-link ${activeSection === sec.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(sec.id)}
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Article Body Content */}
        <article className="process-article">
          {/* Section 1 */}
          <section id="section-1" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">1. The problem and what I didn't know</h2>
            <div className="card-box">
              <ul className="clean-list">
                <li>
                  <strong>Goal:</strong> raise the share of submitted conversations that pass review. About half fail today.
                </li>
                <li>
                  <strong>Guardrails:</strong> don't make the work so burdensome that qualified contributors quit, and don't make conversations sound scripted.
                </li>
                <li>
                  <strong>Constraints:</strong> four-hour cap. No rejection data and no contributor access. I worked from screenshots and a walkthrough recording, so every hypothesis below is untested.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">2. Hypotheses</h2>
            <p className="section-subtext">Confidence labels are my judgment, not data.</p>

            <div className="table-responsive-wrapper">
              <table className="process-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '48px' }}>#</th>
                    <th scope="col">Hypothesis</th>
                    <th scope="col" style={{ width: '140px' }}>Confidence</th>
                    <th scope="col">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cell-num">1</td>
                    <td><strong>Too much guidance upfront, little recalled mid-call</strong></td>
                    <td><span className="badge-confidence badge-high">High</span></td>
                    <td>The guide is a long list of rules, and nothing brings it back during the call</td>
                  </tr>
                  <tr>
                    <td className="cell-num">2</td>
                    <td><strong>Failures only surface at review</strong></td>
                    <td><span className="badge-confidence badge-high">High</span></td>
                    <td>Silence, flat emotion, tool mistakes and audio defects are invisible until rejection, so people can't fix or learn</td>
                  </tr>
                  <tr>
                    <td className="cell-num">3</td>
                    <td><strong>The dialogue walkthrough invites script-reading</strong></td>
                    <td><span className="badge-confidence badge-medium">Medium, untested</span></td>
                    <td>It may also be what makes the tool-call steps learnable</td>
                  </tr>
                  <tr>
                    <td className="cell-num">4</td>
                    <td><strong>The Assistant role is overloaded</strong></td>
                    <td><span className="badge-confidence badge-high">Medium-high</span></td>
                    <td>Sounding natural and following a tool protocol at once</td>
                  </tr>
                  <tr>
                    <td className="cell-num">5</td>
                    <td><strong>The device check is too shallow</strong></td>
                    <td><span className="badge-confidence badge-medium">Medium, probably narrow</span></td>
                    <td>Only matters if audio defects dominate rejections</td>
                  </tr>
                  <tr>
                    <td className="cell-num">6</td>
                    <td><strong>Contributors have no model of the reviewer (added)</strong></td>
                    <td><span className="badge-confidence badge-medium">Medium</span></td>
                    <td>They can't see what "pass" looks like, so they guess</td>
                  </tr>
                  <tr>
                    <td className="cell-num">7</td>
                    <td><strong>The partner is a hidden dependency (added)</strong></td>
                    <td><span className="badge-confidence badge-medium">Medium</span></td>
                    <td>One weak track sinks both submissions, and neither person can see or repair it</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">3. Five directions</h2>
            <p className="section-subtext">
              Each card shows: name, one-line idea, how it changes behavior, User experience, Assistant experience, failure and recovery, main risk, and a sketch. Label every sketch except E: "Exploration sketch, not built".
            </p>

            <div className="directions-stack">
              {/* Direction A */}
              <div className="direction-card">
                <div className="direction-card-grid">
                  {/* Left Column: Sketch */}
                  <div className="direction-sketch-col">
                    <div className="sketch-frame" role="img" aria-label="Exploration sketch showing an AI partner practice card, a waveform timeline with a flagged silence at 0:04 in orange, and a Try that beat again button.">
                      <div className="sketch-badge-bar">
                        <span className="sketch-label">Exploration sketch, not built</span>
                      </div>
                      <div className="sketch-canvas" aria-hidden="true">
                        <div className="sketch-window-header">
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-title">PRACTICE ROUND (90s)</span>
                        </div>
                        <div className="sketch-ai-card">
                          <div className="sketch-avatar-row">
                            <div className="sketch-avatar-circle" />
                            <div className="sketch-text-lines">
                              <div className="sketch-line-dark" style={{ width: '90px' }} />
                              <div className="sketch-line-light" style={{ width: '130px' }} />
                            </div>
                          </div>
                          <div className="sketch-timeline-mini">
                            <div className="sketch-wave-row">
                              <span className="sketch-lane-tag">YOU</span>
                              <div className="sketch-bars-track">
                                <span className="bar-h bar-1" /><span className="bar-h bar-2" /><span className="bar-h bar-1" />
                              </div>
                            </div>
                            <div className="sketch-wave-row">
                              <span className="sketch-lane-tag">AI</span>
                              <div className="sketch-bars-track">
                                <span className="bar-h bar-2" />
                                <span className="sketch-flag-marker-orange" title="0:04 Silence">
                                  0:04 Gap
                                </span>
                                <span className="bar-h bar-3" /><span className="bar-h bar-1" />
                              </div>
                            </div>
                          </div>
                          <div className="sketch-btn-row">
                            <span className="sketch-pill-btn-orange">Try that beat again</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="sr-only">Exploration sketch showing practice screen with an AI partner card, a short timeline with one flagged silence at 0:04, and a Try that beat again button.</span>
                  </div>

                  {/* Right Column: Content */}
                  <div className="direction-text-col">
                    <div className="direction-header">
                      <span className="direction-badge">A</span>
                      <h3 className="direction-title">A. Rehearsal Round (big swing)</h3>
                    </div>

                    <p className="direction-idea">
                      <strong>Idea:</strong> replace the guide wall with a 90-second practice call against an AI partner, with instant scored feedback.
                    </p>

                    <dl className="direction-fields">
                      <div className="field-group">
                        <dt className="field-term">Behavior change:</dt>
                        <dd className="field-desc">contributors build a felt sense of "pass" before the real call.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">User:</dt>
                        <dd className="field-desc">practices the emotional arc (frustrated, then relieved).</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Assistant:</dt>
                        <dd className="field-desc">practices the tool-call steps against a simulated User.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Failure and recovery:</dt>
                        <dd className="field-desc">a 4-second silence is flagged on a replay timeline and you retry that beat until it lands.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Main risk:</dt>
                        <dd className="field-desc">unpaid work before paid work, and a voice-AI partner is costly to build.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Direction B */}
              <div className="direction-card">
                <div className="direction-card-grid">
                  {/* Left Column: Sketch */}
                  <div className="direction-sketch-col">
                    <div className="sketch-frame" role="img" aria-label="Exploration sketch showing an in-call screen with a slim health strip and an amber nudge pill reading Gap of 4s. A quick mm helps.">
                      <div className="sketch-badge-bar">
                        <span className="sketch-label">Exploration sketch, not built</span>
                      </div>
                      <div className="sketch-canvas" aria-hidden="true">
                        <div className="sketch-window-header">
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-title">LIVE CALL (0:42)</span>
                        </div>
                        <div className="sketch-health-strip-box">
                          <div className="sketch-health-row">
                            <span className="sketch-health-label">CONVERSATION HEALTH</span>
                            <div className="sketch-mini-meter">
                              <span className="meter-tick on" />
                              <span className="meter-tick on" />
                              <span className="meter-tick on" />
                              <span className="meter-tick" />
                            </div>
                          </div>
                          <div className="sketch-call-speakers">
                            <div className="sketch-speaker-tile">
                              <div className="sketch-avatar-circle" />
                              <span className="sketch-speaker-name">Maya (User)</span>
                            </div>
                            <div className="sketch-speaker-tile">
                              <div className="sketch-avatar-circle" />
                              <span className="sketch-speaker-name">Dave (Assistant)</span>
                            </div>
                          </div>
                          <div className="sketch-nudge-center">
                            <div className="sketch-nudge-pill-amber">
                              ⚠ Gap of 4s. A quick 'mm' helps.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="sr-only">Exploration sketch showing in-call screen with a slim health strip and one amber nudge pill reading Gap of 4s. A quick mm helps.</span>
                  </div>

                  {/* Right Column: Content */}
                  <div className="direction-text-col">
                    <div className="direction-header">
                      <span className="direction-badge">B</span>
                      <h3 className="direction-title">B. Live Coach (big swing)</h3>
                    </div>

                    <p className="direction-idea">
                      <strong>Idea:</strong> a shared "conversation health" strip during the call: silence gap, airtime balance, backchannels, audio quality.
                    </p>

                    <dl className="direction-fields">
                      <div className="field-group">
                        <dt className="field-term">Behavior change:</dt>
                        <dd className="field-desc">failures get fixed in the moment.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">User:</dt>
                        <dd className="field-desc">sees the strip and an emotion-arc marker.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Assistant:</dt>
                        <dd className="field-desc">sees the strip and a tool-state chip.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Failure and recovery:</dt>
                        <dd className="field-desc">a gap over 3 seconds produces a soft nudge, timed for pauses; clipping pauses capture with a one-tap fix.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Main risk:</dt>
                        <dd className="field-desc">self-consciousness and stilted talk, embarrassment when one partner is doing worse, and costly real-time analysis.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Direction C */}
              <div className="direction-card">
                <div className="direction-card-grid">
                  {/* Left Column: Sketch */}
                  <div className="direction-sketch-col">
                    <div className="sketch-frame" role="img" aria-label="Exploration sketch showing a left rail of conversation beats next to a call view with a tool console button.">
                      <div className="sketch-badge-bar">
                        <span className="sketch-label">Exploration sketch, not built</span>
                      </div>
                      <div className="sketch-canvas" aria-hidden="true">
                        <div className="sketch-window-header">
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-title">BEAT CONSOLE</span>
                        </div>
                        <div className="sketch-beats-split">
                          <div className="sketch-beats-rail">
                            <span className="sketch-rail-title">BEATS</span>
                            <div className="sketch-beat-item done">✓ Get address</div>
                            <div className="sketch-beat-item active">● Ask transit</div>
                            <div className="sketch-beat-item pending">○ Feel relieved</div>
                          </div>
                          <div className="sketch-beats-callview">
                            <div className="sketch-call-box">
                              <div className="sketch-line-light" style={{ width: '80%' }} />
                              <div className="sketch-line-dark" style={{ width: '60%' }} />
                            </div>
                            <div className="sketch-tool-console-btn">
                              ⚡ Tool: Looking that up…
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="sr-only">Exploration sketch showing left rail of beats with one done, one active, one pending next to a call view with a tool console button.</span>
                  </div>

                  {/* Right Column: Content */}
                  <div className="direction-text-col">
                    <div className="direction-header">
                      <span className="direction-badge">C</span>
                      <h3 className="direction-title">C. Beat Rail + Tool Console (big swing)</h3>
                    </div>

                    <p className="direction-idea">
                      <strong>Idea:</strong> drop the line-by-line walkthrough. Show goals as beats, and turn tool calls into UI actions.
                    </p>

                    <dl className="direction-fields">
                      <div className="field-group">
                        <dt className="field-term">Behavior change:</dt>
                        <dd className="field-desc">people improvise toward goals, and protocol errors fall because the protocol is a control.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">User:</dt>
                        <dd className="field-desc">tracks arc beats ("get the address", "ask how far", "feel relieved").</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Assistant:</dt>
                        <dd className="field-desc">uses a tool console ("Looking that up…") instead of remembering steps.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Failure and recovery:</dt>
                        <dd className="field-desc">a skipped beat prompts "still need the address?" so it's repaired in conversation.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Main risk:</dt>
                        <dd className="field-desc">comprehension may drop without example lines, and it depends on the platform supporting tool-call UI.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Direction D */}
              <div className="direction-card">
                <div className="direction-card-grid">
                  {/* Left Column: Sketch */}
                  <div className="direction-sketch-col">
                    <div className="sketch-frame" role="img" aria-label="Exploration sketch showing a device check with four meters where clipping is failing with a fix hint in orange, and a partner-ready indicator.">
                      <div className="sketch-badge-bar">
                        <span className="sketch-label">Exploration sketch, not built</span>
                      </div>
                      <div className="sketch-canvas" aria-hidden="true">
                        <div className="sketch-window-header">
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-dot" />
                          <span className="sketch-window-title">PRE-FLIGHT AUDIO CHECK</span>
                        </div>
                        <div className="sketch-meters-card">
                          <div className="sketch-meters-2x2">
                            <div className="sketch-meter-tile">
                              <span className="sketch-meter-name">Noise floor</span>
                              <div className="sketch-meter-bar-fill" style={{ width: '40%' }} />
                              <span className="sketch-meter-status ok">Clean</span>
                            </div>
                            <div className="sketch-meter-tile meter-alert-orange">
                              <span className="sketch-meter-name">Clipping</span>
                              <div className="sketch-meter-bar-fill alert" style={{ width: '90%' }} />
                              <span className="sketch-meter-status alert">Failed: Move mic back</span>
                            </div>
                            <div className="sketch-meter-tile">
                              <span className="sketch-meter-name">Echo check</span>
                              <div className="sketch-meter-bar-fill" style={{ width: '25%' }} />
                              <span className="sketch-meter-status ok">Isolated</span>
                            </div>
                            <div className="sketch-meter-tile">
                              <span className="sketch-meter-name">Headset</span>
                              <div className="sketch-meter-bar-fill" style={{ width: '70%' }} />
                              <span className="sketch-meter-status ok">Detected</span>
                            </div>
                          </div>
                          <div className="sketch-handshake-bar">
                            <span className="sketch-ready-dot" />
                            <span>Partner Handshake: Ready ✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="sr-only">Exploration sketch showing device check with four meters, one failing with a fix hint, and a partner-ready indicator.</span>
                  </div>

                  {/* Right Column: Content */}
                  <div className="direction-text-col">
                    <div className="direction-header">
                      <span className="direction-badge">D</span>
                      <h3 className="direction-title">D. Deep Pre-flight</h3>
                    </div>

                    <p className="direction-idea">
                      <strong>Idea:</strong> upgrade the device check to measure noise floor, clipping on a loud phrase, echo and headset, plus a partner-ready handshake.
                    </p>

                    <dl className="direction-fields">
                      <div className="field-group">
                        <dt className="field-term">Behavior change:</dt>
                        <dd className="field-desc">audio defects are caught before anyone records.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">User:</dt>
                        <dd className="field-desc">both run the same check; each sees the other's ready state.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Assistant:</dt>
                        <dd className="field-desc">both run the same check; each sees the other's ready state.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Failure and recovery:</dt>
                        <dd className="field-desc">a failed clipping test gives guided fixes and a re-test.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Main risk:</dt>
                        <dd className="field-desc">narrow. It only helps if audio is a large share of rejections.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Direction E */}
              <div className="direction-card direction-chosen">
                <div className="direction-card-grid">
                  {/* Left Column: Built Image or Fallback CSS Sketch */}
                  <div className="direction-sketch-col">
                    <div className="sketch-frame sketch-chosen-frame">
                      <div className="sketch-badge-bar">
                        <span className="sketch-label sketch-label-chosen">Built Prototype Preview</span>
                      </div>
                      <div className="sketch-canvas-chosen">
                        {!eImgFailed ? (
                          <img
                            src="/e-review.png"
                            alt="Screenshot of the built Direction E review screen with two-lane timeline, flagged moments list, and partner progress."
                            className="built-screenshot-img"
                            onError={() => setEImgFailed(true)}
                          />
                        ) : (
                          /* Fallback CSS sketch if image is missing */
                          <div className="sketch-fallback-review" aria-label="Fallback CSS sketch of built review screen">
                            <div className="sketch-fallback-status">
                              <span className="sketch-fallback-tag">⚠ Likely to be flagged</span>
                              <div className="sketch-line-dark" style={{ width: '70%', height: '8px' }} />
                            </div>
                            <div className="sketch-fallback-lanes">
                              <div className="sketch-fallback-lane">
                                <span className="lane-id">YOU</span>
                                <div className="lane-line orange" />
                                <span className="pin pin-1">1</span>
                                <span className="pin pin-3">3</span>
                              </div>
                              <div className="sketch-fallback-lane">
                                <span className="lane-id">PARTNER</span>
                                <div className="lane-line gray" />
                                <span className="pin pin-2">2</span>
                                <span className="pin pin-4">4</span>
                              </div>
                            </div>
                            <div className="sketch-fallback-card">
                              <span className="flag-title-mock">Moment 3 · 7s silence</span>
                              <span className="fix-btn-mock">Fix this moment</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="direction-text-col">
                    <div className="direction-header">
                      <span className="direction-badge badge-chosen">E</span>
                      <h3 className="direction-title">E. Instant Self-Review + Punch-in Redo</h3>
                      <span className="chosen-tag">Chosen</span>
                    </div>

                    <p className="direction-idea">
                      <strong>Idea:</strong> after each round, show a status and the flagged moments. Each person re-records only their own flagged moments against the partner's original track.
                    </p>

                    <dl className="direction-fields">
                      <div className="field-group">
                        <dt className="field-term">Behavior change:</dt>
                        <dd className="field-desc">the live conversation stays natural, and rejection becomes a fixable moment.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">User:</dt>
                        <dd className="field-desc">reviews flags, re-records, checks the result.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Assistant:</dt>
                        <dd className="field-desc">same flow, including a tool-state cue in the redo.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Failure and recovery:</dt>
                        <dd className="field-desc">a round marked "Likely to be flagged" recovers to "Looks good" after redo.</dd>
                      </div>
                      <div className="field-group">
                        <dt className="field-term">Main risk:</dt>
                        <dd className="field-desc">needs a trustworthy detector, adds unpaid post-call work, and a spliced redo can sound stitched.</dd>
                      </div>
                    </dl>

                    <div className="direction-cta-wrap">
                      <a href="#/review" className="btn btn-primary btn-sm">
                        Open the working demo →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">4. How I scored them</h2>
            <p className="section-subtext">
              Scores are 1 to 5, where 5 is best (low burden, low scripted-risk, easy build).
            </p>

            <h3 className="table-subheading">First pass (five criteria)</h3>
            <div className="table-responsive-wrapper">
              <table className="process-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '48px' }}></th>
                    <th scope="col">Pass-rate impact</th>
                    <th scope="col">Burden</th>
                    <th scope="col">Scripted risk</th>
                    <th scope="col">Build</th>
                    <th scope="col">Measurable</th>
                    <th scope="col" style={{ fontWeight: 700 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>A</strong></td>
                    <td>4</td>
                    <td>2</td>
                    <td>4</td>
                    <td>2</td>
                    <td>4</td>
                    <td><strong>16</strong></td>
                  </tr>
                  <tr>
                    <td><strong>B</strong></td>
                    <td>4</td>
                    <td>4</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td><strong>20</strong></td>
                  </tr>
                  <tr>
                    <td><strong>C</strong></td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>3</td>
                    <td>3</td>
                    <td><strong>18</strong></td>
                  </tr>
                  <tr>
                    <td><strong>D</strong></td>
                    <td>2</td>
                    <td>4</td>
                    <td>5</td>
                    <td>5</td>
                    <td>4</td>
                    <td><strong>20</strong></td>
                  </tr>
                  <tr>
                    <td><strong>E</strong></td>
                    <td>3</td>
                    <td>2</td>
                    <td>4</td>
                    <td>3</td>
                    <td>5</td>
                    <td><strong>17</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="table-subheading" style={{ marginTop: 'var(--s6)' }}>After adding two criteria</h3>
            <div className="table-responsive-wrapper">
              <table className="process-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '48px' }}></th>
                    <th scope="col">First-pass total</th>
                    <th scope="col">Recovery</th>
                    <th scope="col">Social safety</th>
                    <th scope="col" style={{ fontWeight: 700 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>A</strong></td>
                    <td>16</td>
                    <td>2</td>
                    <td>5</td>
                    <td><strong>23</strong></td>
                  </tr>
                  <tr>
                    <td><strong>B</strong></td>
                    <td>20</td>
                    <td>3</td>
                    <td>2</td>
                    <td><strong>25</strong></td>
                  </tr>
                  <tr>
                    <td><strong>C</strong></td>
                    <td>18</td>
                    <td>2</td>
                    <td>5</td>
                    <td><strong>25</strong></td>
                  </tr>
                  <tr>
                    <td><strong>D</strong></td>
                    <td>20</td>
                    <td>1</td>
                    <td>5</td>
                    <td><strong>26</strong></td>
                  </tr>
                  <tr className="row-highlight">
                    <td><strong>E</strong></td>
                    <td>17</td>
                    <td>5</td>
                    <td>4</td>
                    <td><strong>26</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <aside className="callout-note" role="note">
              <strong>Note:</strong> my first-pass favorite was B. I added Recovery (can a failed round be saved?) and Social safety (does feedback embarrass one partner in front of the other?) because the original five missed them. E ties D on total but has a higher ceiling, and D works better as a component of any direction than as the main bet.
            </aside>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">5. Why E, and the tradeoffs</h2>
            <div className="card-box">
              <ul className="clean-list">
                <li>
                  <strong>Why E:</strong> it's the only direction that turns rejection into something fixable, it leaves the live conversation untouched, and its feedback arrives right after the work instead of after a rejection.
                </li>
                <h2>Tradeoffs</h2>
                <li>
                  <strong>Redo is unpaid, framed as protecting the round's credits.</strong> Risk: abandonment. Mitigation: it's short and capped.
                </li>
                <li>
                  <strong>Only the flag's owner re-records,</strong> against the partner's original track. The partner isn't needed live. Risk: continuity, since the partner's next line was a response to the original.
                </li>
                <li>
                  <strong>Vague staus to avoid overpromising.</strong> Looks good / Likely to be flagged / Likely to fail, with a standing line that a human reviewer decides. This avoids over-promising.
                </li>
                <li>
                  <strong>Caps:</strong> 3 moments per person per round, 2 takes per moment, so redo can't become re-recording the whole call.
                </li>
                <li>
                  <strong>Both-owned flags</strong> are assigned to one person to fix, so redo stays one-sided.
                </li>
              </ul>

              <h3 className="subheading-inline" style={{ marginTop: 'var(--s6)' }}>What data would change my mind</h3>
              <ul className="clean-list" style={{ marginTop: 'var(--s2)' }}>
                <li>Rejections are mostly audio: D leads and E shrinks.</li>
                <li>Rejections are mostly tool-protocol errors: C leads.</li>
                <li>First-timers fail far more than repeat contributors: A moves up.</li>
                <li>Spliced redo sounds unnatural to reviewers: retreat to feedback without redo.</li>
                <li>Most failures trace to the partner with no recourse: add re-match or full-round redo.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">6. What I'd test next</h2>
            <div className="card-box">
              <ol className="clean-ordered-list">
                <li>Redo vs. opts to not redo pass rate.</li>
                <li>Unpaid-but-protected vs. paid redo: start rate, completion, abandonment.</li>
                <li>A listening test: do reviewers rate spliced segments as natural as originals?</li>
                <li>Detector accuracy in shadow mode against real reviewer decisions.</li>
                <li>First-time vs. repeat contributors changes the user journey story of where the friction is.</li>
              </ol>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="process-section" tabIndex={-1}>
            <h2 className="section-heading">7. Known gaps of the prototype</h2>
            <div className="card-box">
              <ul className="clean-list">
                <li>Audio is simulated and flags are fixed mock data.</li>
                <li>Rounds 2 and 3 are not built.</li>
                <li>"Protected from rejection" is my interpretation and unconfirmed with the review team.</li>
                <li>The effect of redo on reviewer perception is untested.</li>
              </ul>
            </div>
            <a href="#/project-guide" className="btn btn-primary btn-lg">
              Open the working demo →
            </a>
          </section>
        </article>
      </div>
    </div>
  );
};
