import React, { useState, useEffect, useRef } from 'react';
import { useDemo } from '../../state/DemoContext';
import { MOCK_TRANSCRIPT } from '../../data/mock';
import { logEvent } from '../../lib/analytics';
import type { Flag, Turn } from '../../types';
import { LightbulbIcon, ClockIcon, CheckIcon, AlertTriangleIcon, CloseIcon } from '../common/Icons';
import './RedoStudioScreen.css';

interface RedoStudioScreenProps {
  flagId: string;
  onBackToReview: () => void;
  onTakeKept: (flagId: string) => void;
}

type RedoStage =
  | 'listen'
  | 'countdown'
  | 'recording'
  | 'checking'
  | 'fixed'
  | 'stillFlagged'
  | 'capReached';

export const RedoStudioScreen: React.FC<RedoStudioScreenProps> = ({
  flagId,
  onBackToReview,
  onTakeKept
}) => {
  const { state, dispatch, activeFlags } = useDemo();

  const flag = activeFlags.find((f) => f.id === flagId);
  const currentTakes = state.takes[flagId]?.attempts || [];
  const attemptCount = currentTakes.length;

  const [stage, setStage] = useState<RedoStage>('listen');
  const [countdownValue, setCountdownValue] = useState<number>(3);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [meterAmp, setMeterAmp] = useState<number>(0.3);
  const [toolStateText, setToolStateText] = useState<'Finding message…' | 'Result ready'>('Finding message…');
  const [isSimulatedPlayback, setIsSimulatedPlayback] = useState<boolean>(false);
  const [playLeadInCount, setPlayLeadInCount] = useState<number>(0);
  const [isPlayingTakePreview, setIsPlayingTakePreview] = useState<boolean>(false);
  const [recordingAnnouncement, setRecordingAnnouncement] = useState<string>('');

  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const partnerName = state.viewAs === 'User' ? 'Dave' : 'Maya';

  // Segment duration in seconds from flag.segment or start..end
  const segmentDuration = flag
    ? flag.segment
      ? flag.segment[1] - flag.segment[0]
      : Math.max(6, flag.end - flag.start)
    : 8;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Resolve lead-in and lead-out per SPEC §18
  const leadInTurn: Turn | undefined = flag?.leadIn
    ? MOCK_TRANSCRIPT.find((t) => t.id === flag.leadIn)
    : undefined;

  const leadOutTurn: Turn | undefined = flag?.leadOut
    ? MOCK_TRANSCRIPT.find((t) => t.id === flag.leadOut)
    : undefined;

  // Transcript lines representing "What was said" (for reference only, never replacement script)
  const originalTurns = useMemoTurns(flag);

  function useMemoTurns(f?: Flag): Turn[] {
    if (!f) return [];
    const [segStart, segEnd] = f.segment ?? [f.start, f.end];
    return MOCK_TRANSCRIPT.filter(
      (t) => t.t >= segStart && t.t <= segEnd && t.who !== 'TOOL'
    );
  }

  // Log redo_started per SPEC §14
  useEffect(() => {
    logEvent('redo_started', { id: flagId });
  }, [flagId]);

  // Focus result heading when landing on fixed, stillFlagged, or capReached per SPEC §8 & §11
  useEffect(() => {
    if (stage === 'fixed' || stage === 'stillFlagged' || stage === 'capReached') {
      resultHeadingRef.current?.focus();
    }
  }, [stage]);

  // Stepper active number (1: Listen, 2: Record, 3: Check)
  const getStepNumber = () => {
    if (stage === 'listen') return 1;
    if (stage === 'countdown' || stage === 'recording') return 2;
    return 3;
  };

  // 1. Listen Stage: Simulated audio preview of lead-in
  const handlePlayLeadIn = () => {
    setIsSimulatedPlayback(true);
    setPlayLeadInCount(6);
  };

  useEffect(() => {
    let timer: number;
    if (isSimulatedPlayback) {
      timer = window.setInterval(() => {
        setPlayLeadInCount((prev) => {
          if (prev <= 1) {
            setIsSimulatedPlayback(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSimulatedPlayback]);

  // Simulated preview of recorded take with original context
  const handlePlayTakeWithOriginal = () => {
    setIsPlayingTakePreview(true);
    window.setTimeout(() => {
      setIsPlayingTakePreview(false);
    }, 3000);
  };

  // 2. Start Recording sequence: countdown -> recording
  const handleStartRecord = () => {
    if (state.reduceMotion) {
      // Reduced motion skips animated countdown per SPEC §8 & §11
      setStage('recording');
      setRecordSeconds(0);
      setRecordingAnnouncement('Recording started. Your turn.');
      return;
    }

    setStage('countdown');
    setCountdownValue(3);
  };

  // Countdown timer
  useEffect(() => {
    let timer: number;
    if (stage === 'countdown') {
      timer = window.setInterval(() => {
        setCountdownValue((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('recording');
            setRecordSeconds(0);
            setRecordingAnnouncement('Recording started. Your turn.');
            return 0;
          }
          return prev - 1;
        });
      }, 800);
    }
    return () => clearInterval(timer);
  }, [stage]);

  // Recording active timer and meter
  useEffect(() => {
    let interval: number;
    let toolTimer: number;

    if (stage === 'recording') {
      // If Assistant on F1, update tool-state chip after 3s
      if (flagId === 'F1' && state.viewAs === 'Assistant') {
        setToolStateText('Finding message…');
        toolTimer = window.setTimeout(() => {
          setToolStateText('Result ready');
        }, 3000);
      }

      interval = window.setInterval(() => {
        setRecordSeconds((prev) => {
          const next = prev + 1;
          if (next >= segmentDuration) {
            // Auto finish at segment duration in demo per SPEC §4 S2
            handleFinishRecording();
          }
          return next;
        });

        // Smooth simulated amplitude meter (unless reduced motion is active)
        if (!state.reduceMotion) {
          setMeterAmp(0.2 + Math.random() * 0.6);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(toolTimer);
    };
  }, [stage, segmentDuration, flagId, state.viewAs, state.reduceMotion]);

  // Finish recording and transition to checking
  const handleFinishRecording = () => {
    setRecordingAnnouncement('Recording stopped. Checking your take.');
    setStage('checking');
  };

  // Checking phase: 1.5s delay then evaluate outcome per SPEC §8 & §13
  useEffect(() => {
    let timer: number;
    if (stage === 'checking') {
      timer = window.setTimeout(() => {
        const nextAttemptNum = attemptCount + 1;

        // Determine outcome based on demo control mode per SPEC §7, §8, §13
        let outcome: 'fixed' | 'still_flagged' = 'fixed';
        let failReason = 'Still a 4-second gap before you reply.';
        let failHint = 'Try letting a little frustration into your voice as you mention across town.';

        if (state.takeOutcomeMode === 'always_fixed') {
          outcome = 'fixed';
        } else if (state.takeOutcomeMode === 'always_still_flagged') {
          outcome = 'still_flagged';
          if (flagId === 'F3') {
            failReason = "Still sounds even. Try letting a little frustration into 'across town'.";
            failHint = 'Start annoyed that plans changed. A little exasperation is plenty.';
          } else if (flagId === 'F1') {
            failReason = 'The address was still spoken before the lookup result appeared.';
            failHint = "Acknowledge that you're checking, wait for 'Result ready', then read the address.";
          } else if (flagId === 'F2') {
            failReason = 'Still a 4-second gap before you reply.';
            failHint = "Add a quick 'hm' or 'okay' while thinking so the conversation stays connected.";
          } else if (flagId === 'F4') {
            failReason = 'A slight burst of air still clipped on the opening consonant.';
            failHint = 'Angle the mic slightly to the side of your mouth.';
          }
        } else {
          // Default: first take on F3 is still flagged, 2nd take is fixed; all others fixed on take 1
          if (flagId === 'F3' && nextAttemptNum === 1) {
            outcome = 'still_flagged';
            failReason = "Still sounds even. Try letting a little frustration into 'across town'.";
            failHint = 'Start annoyed that plans changed. A little exasperation is plenty.';
          } else {
            outcome = 'fixed';
          }
        }

        dispatch({
          type: 'RECORD_TAKE',
          payload: {
            flagId,
            result: outcome,
            reason: outcome === 'still_flagged' ? failReason : undefined,
            hint: outcome === 'still_flagged' ? failHint : undefined
          }
        });

        logEvent('take_checked', {
          id: flagId,
          take: nextAttemptNum,
          result: outcome
        });

        if (outcome === 'fixed') {
          setStage('fixed');
        } else {
          if (nextAttemptNum >= 2) {
            // Reached max 2 takes cap per SPEC §2 & §4 S3
            setStage('capReached');
          } else {
            setStage('stillFlagged');
          }
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [stage, attemptCount, flagId, state.takeOutcomeMode, dispatch]);

  // Keep take actions
  const handleKeepTake = (choice: 'take1' | 'take2' | 'original', isFixed: boolean) => {
    dispatch({
      type: 'KEEP_TAKE',
      payload: {
        flagId,
        choice,
        isFixed
      }
    });
    logEvent('take_kept', { id: flagId, take: choice });
    onTakeKept(flagId);
  };

  // Skip moment action per SPEC §2, §6, §14
  const handleSkipMoment = () => {
    dispatch({ type: 'SKIP_FLAG', payload: flagId });
    logEvent('redo_skipped', { id: flagId });
    onBackToReview();
  };

  if (!flag) {
    return (
      <div className="redo-studio-container">
        <h1 tabIndex={-1}>Moment not found</h1>
        <button type="button" className="btn btn-secondary" onClick={onBackToReview}>
          Back to review
        </button>
      </div>
    );
  }

  const stepNumber = getStepNumber();

  return (
    <div className="redo-studio-container">
      {/* Polite live region for recording start/stop announcements per SPEC §11 */}
      <div className="sr-only" role="status" aria-live="polite">
        {recordingAnnouncement}
      </div>

      {/* Back button and Top Bar */}
      <nav aria-label="Studio navigation" className="studio-top-nav">
        <button type="button" className="back-link-btn" onClick={onBackToReview}>
          ‹ Back to review
        </button>
        <span className="simulated-label-badge" title="No real audio files or microphone needed">
          Demo: audio is simulated
        </span>
      </nav>

      <header className="studio-header">
        <div className="studio-header-titles">
          <span className="studio-eyebrow">REDO MOMENT • {flag.bucket.toUpperCase()}</span>
          <h1 tabIndex={-1} className="studio-title">{flag.title}</h1>
          <p className="studio-header-time">
            Re-record just this moment, about {segmentDuration} seconds.
          </p>
        </div>

        {/* Stepper: Listen -> Record -> Check per SPEC §4 S2 and §12 */}
        <div className="studio-stepper" role="progressbar" aria-valuenow={stepNumber} aria-valuemin={1} aria-valuemax={3}>
          <div className={`step-item ${stepNumber >= 1 ? 'step-active' : ''}`}>
            <span className="step-circle">1</span>
            <span className="step-label">Listen</span>
          </div>
          <span className="step-connector" aria-hidden="true" />
          <div className={`step-item ${stepNumber >= 2 ? 'step-active' : ''}`}>
            <span className="step-circle">2</span>
            <span className="step-label">Record</span>
          </div>
          <span className="step-connector" aria-hidden="true" />
          <div className={`step-item ${stepNumber >= 3 ? 'step-active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Check</span>
          </div>
        </div>

        {/* Mobile compact stepper text per SPEC §12 */}
        <div className="studio-stepper-mobile" aria-hidden="true">
          Step {stepNumber} of 3
        </div>
      </header>

      {/* Continuity note on every redo per SPEC §4 S2 & §9 */}
      <aside className="continuity-callout" role="note">
        <span className="continuity-icon" aria-hidden="true">
          <LightbulbIcon size={18} />
        </span>
        <p>
          Say it in your own words. Keep the same meaning so {partnerName}'s next line still fits.
        </p>
      </aside>

      {/* Main Studio Interactive Panel */}
      <div className="studio-main-card">
        {/* STAGE 1: LISTEN */}
        {stage === 'listen' && (
          <div className="studio-stage-listen">
            <h2 className="stage-heading">Listen to the moment</h2>

            {/* Goal Card (What to aim for, not what to say) */}
            <div className="goal-card">
              <span className="goal-card-tag">What to aim for</span>
              <p className="goal-card-text">{flag.goal || flag.reason}</p>
              {flag.kind === 'emotion' && (
                <div className="emotion-arc-pill">
                  Tone arc: Start annoyed → end relieved
                </div>
              )}
            </div>

            {/* Why it was flagged */}
            <div className="reason-box">
              <strong>Here's the moment ({formatTime(flag.start)}–{formatTime(flag.end)}):</strong>
              <p>{flag.reason}</p>
            </div>

            {/* What was said (for reference only, greyed, never replacement scripts) */}
            <div className="reference-transcript-box">
              <span className="ref-tag">What was said (for reference, not a script)</span>
              {originalTurns.map((t) => (
                <p key={t.id} className="greyed-original-text">
                  "{t.text}"
                </p>
              ))}
            </div>

            {/* Simulated Lead-In per SPEC §18 #2 */}
            <div className="lead-in-section">
              <span className="cue-label">Lead-in cue:</span>
              {leadInTurn && leadInTurn.who === 'TOOL' ? (
                <div className="lead-in-bubble tool-cue">
                  <span className="lead-speaker">Silent tool marker:</span>
                  <p className="lead-text">Tool running: {leadInTurn.text}</p>
                  <span className="silent-note">There is nothing to play for this silent tool cue.</span>
                </div>
              ) : leadInTurn ? (
                <div className="lead-in-bubble">
                  <span className="lead-speaker">{partnerName}'s previous line:</span>
                  <p className="lead-text">"{leadInTurn.text}"</p>
                  <button
                    type="button"
                    className="lead-in-play-btn"
                    onClick={handlePlayLeadIn}
                  >
                    {isSimulatedPlayback ? `Playing cue (${playLeadInCount}s)…` : '▶ Play lead-in (~6s)'}
                  </button>
                </div>
              ) : (
                <div className="lead-in-bubble start-cue">
                  <span className="lead-text">Start of conversation</span>
                </div>
              )}
            </div>

            <div className="stage-bottom-actions">
              <button
                type="button"
                className="btn btn-primary btn-record-launch"
                onClick={handleStartRecord}
              >
                Record this moment
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSkipMoment}
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2A: COUNTDOWN */}
        {stage === 'countdown' && (
          <div className="studio-stage-countdown" role="alert" aria-live="assertive">
            <span className="countdown-eyebrow">Get ready to speak…</span>
            <div className="countdown-number" aria-label={`Starting in ${countdownValue} seconds`}>
              {countdownValue}
            </div>
            <p className="countdown-lead-note">
              {leadInTurn && leadInTurn.who !== 'TOOL'
                ? `${partnerName}'s lead-in playing…`
                : `Starting recording…`}
            </p>
          </div>
        )}

        {/* STAGE 2B: RECORDING */}
        {stage === 'recording' && (
          <div className="studio-stage-recording">
            <div className="rec-live-header">
              <span className="rec-badge">
                <span className="rec-pulse-dot" /> Your turn — Recording…
              </span>
              <span className="rec-timer" aria-live="off">
                {formatTime(recordSeconds)} / {formatTime(segmentDuration)}
              </span>
            </div>

            {/* Simulated tool state chip for Assistant on F1 per SPEC §4 S2 */}
            {flagId === 'F1' && state.viewAs === 'Assistant' && (
              <div className="tool-state-chip-box" role="status" aria-live="polite">
                <span className="tool-chip-tag">SIMULATED TOOL STATUS:</span>
                <span className={`tool-state-indicator ${toolStateText === 'Result ready' ? 'ready' : 'pending'}`}>
                  {toolStateText === 'Finding message…' ? (
                    <>
                      <ClockIcon size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                      Finding message…
                    </>
                  ) : (
                    <>
                      <CheckIcon size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                      Result ready
                    </>
                  )}
                </span>
                <p className="tool-state-prompt">
                  Say you're checking. Read the result only once it shows as ready.
                </p>
              </div>
            )}

            {/* Simulated smooth visual amplitude meter per SPEC §8 */}
            <div className="visual-mic-meter" aria-hidden="true">
              <div className="meter-bar" style={{ transform: `scaleY(${meterAmp})` }} />
              <div className="meter-bar" style={{ transform: `scaleY(${meterAmp * 0.8})` }} />
              <div className="meter-bar" style={{ transform: `scaleY(${meterAmp * 1.2})` }} />
              <div className="meter-bar" style={{ transform: `scaleY(${meterAmp * 0.9})` }} />
            </div>

            <p className="recording-hint">
              Recording… press Done when you're finished.
            </p>

            {/* Lead-Out preview chip */}
            {leadOutTurn && (
              <div className="lead-out-preview-chip">
                <span>Connecting into {partnerName}'s next line:</span>
                <p>"{leadOutTurn.text}"</p>
              </div>
            )}

            <div className="recording-actions">
              <button
                type="button"
                className="btn btn-primary btn-done-record"
                onClick={handleFinishRecording}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3A: CHECKING (1.5s live region) */}
        {stage === 'checking' && (
          <div className="studio-stage-checking" role="status" aria-live="polite">
            <div className="checking-spinner" aria-hidden="true" />
            <h2 className="checking-title">Checking your take…</h2>
            <p className="checking-subtext">Analyzing pacing, tone, and continuity.</p>
          </div>
        )}

        {/* STAGE 3B: FIXED RESULT */}
        {stage === 'fixed' && (
          <div className="studio-stage-result result-fixed">
            <div className="result-icon-badge fixed-icon" aria-hidden="true">
              <CheckIcon size={24} />
            </div>
            <h2 ref={resultHeadingRef} tabIndex={-1} className="result-title">
              That moment is fixed.
            </h2>
            <p className="result-desc">
              Hear it with the original conversation, then keep it.
            </p>

            <div className="result-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleKeepTake(attemptCount >= 2 ? 'take2' : 'take1', true)}
              >
                Keep this take
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePlayTakeWithOriginal}
              >
                {isPlayingTakePreview
                  ? 'Playing take with original…'
                  : 'Play your take with the original'}
              </button>
              {attemptCount < 2 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleStartRecord}
                >
                  Try once more
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3C: STILL FLAGGED */}
        {stage === 'stillFlagged' && (
          <div className="studio-stage-result result-still-flagged">
            <div className="result-icon-badge flagged-icon" aria-hidden="true">
              <AlertTriangleIcon size={24} />
            </div>
            <h2 ref={resultHeadingRef} tabIndex={-1} className="result-title">
              Close, not quite there.
            </h2>
            <p className="result-desc">
              {currentTakes[currentTakes.length - 1]?.reason || flag.reason}
            </p>
            {currentTakes[currentTakes.length - 1]?.hint && (
              <div className="retry-hint-card">
                <strong>Hint for take 2:</strong>
                <p>{currentTakes[currentTakes.length - 1]?.hint}</p>
              </div>
            )}

            <div className="result-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartRecord}
              >
                Try again (take 2 of 2)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSkipMoment}
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3D: CAP REACHED (2 failed takes) */}
        {stage === 'capReached' && (
          <div className="studio-stage-result result-cap-reached">
            <div className="result-icon-badge cap-icon" aria-hidden="true">
              <CloseIcon size={24} />
            </div>
            <h2 ref={resultHeadingRef} tabIndex={-1} className="result-title">
              We'll keep the original for this moment.
            </h2>
            <p className="result-desc">
              A reviewer may still flag it.
            </p>

            <div className="result-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleKeepTake('original', false)}
              >
                Keep original
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleKeepTake('take2', false)}
              >
                Use my last take anyway
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
