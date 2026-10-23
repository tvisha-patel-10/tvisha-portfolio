import React, { useRef, useState, useEffect, useMemo } from 'react';
import type { Flag, Turn, Role } from '../../types';
import { generateWaveform } from '../../lib/waveform';
import { LightningIcon } from '../common/Icons';
import './Timeline.css';

interface TimelineProps {
  totalDuration: number; // in seconds (e.g. 105 for 1:45)
  playhead: number;
  isPlaying: boolean;
  playbackSpeed: 1 | 4;
  currentRole: Role;
  flags: Flag[];
  turns: Turn[];
  selectedFlagId: string | null;
  highlightRange: [number, number] | null;
  onSeek: (seconds: number) => void;
  onTogglePlay: () => void;
  onSelectFlag: (flagId: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  totalDuration,
  playhead,
  isPlaying,
  playbackSpeed,
  currentRole,
  flags,
  turns,
  selectedFlagId,
  highlightRange,
  onSeek,
  onTogglePlay,
  onSelectFlag
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Lanes definition: top is You, bottom is Partner
  const youRole = currentRole;
  const partnerRole = currentRole === 'User' ? 'Assistant' : 'User';
  const partnerName = currentRole === 'User' ? 'Dave' : 'Maya';

  // Seeded waveforms per lane
  // User lane: silence range at 58s-65s
  const youWaveform = useMemo(() => {
    const seed = youRole === 'User' ? 42 : 108;
    const silence = youRole === 'User' ? [[58, 65] as [number, number]] : [];
    const pop = youRole === 'Assistant' ? [[79, 81] as [number, number]] : [];
    return generateWaveform(seed, totalDuration, 3, silence, pop);
  }, [youRole, totalDuration]);

  // Partner lane
  const partnerWaveform = useMemo(() => {
    const seed = partnerRole === 'Assistant' ? 108 : 42;
    const silence = partnerRole === 'User' ? [[58, 65] as [number, number]] : [];
    const pop = partnerRole === 'Assistant' ? [[79, 81] as [number, number]] : [];
    return generateWaveform(seed, totalDuration, 3, silence, pop);
  }, [partnerRole, totalDuration]);

  // Assistant tool turns
  const toolTurns = useMemo(() => {
    return turns.filter((t) => t.who === 'TOOL');
  }, [turns]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Convert mouse event to timestamp
  const handleSeekFromEvent = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newSeconds = Math.max(0, Math.min(percentage * totalDuration, totalDuration));
    onSeek(newSeconds);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeekFromEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleSeekFromEvent(e.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Keyboard navigation on timeline container per SPEC §11
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const step = e.shiftKey ? 5 : 1;
      onSeek(Math.min(totalDuration, playhead + step));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const step = e.shiftKey ? 5 : 1;
      onSeek(Math.max(0, playhead - step));
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onTogglePlay();
    }
  };

  const playheadPercent = (playhead / totalDuration) * 100;

  // Determine lane for a flag
  const getFlagLaneClass = (flag: Flag) => {
    if (flag.owner === 'Both') return 'flag-both';
    if (flag.owner === currentRole) return 'flag-you';
    return 'flag-partner';
  };

  return (
    <section className="timeline-component" aria-label="Audio waveform and scrub timeline">
      {/* Playback Controls Bar */}
      <div className="timeline-controls-bar">
        <div className="playback-buttons">
          <button
            type="button"
            className="play-pause-btn"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause conversation' : 'Play conversation'}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <span className="time-display" aria-live="off">
            <strong>{formatTime(playhead)}</strong> / {formatTime(totalDuration)}
          </span>

          {playbackSpeed > 1 && (
            <span className="speed-indicator-badge">{playbackSpeed}× speed</span>
          )}
        </div>

        <div className="simulated-label-badge" title="No real audio files or microphone needed">
          Demo: audio is simulated
        </div>
      </div>

      {/* Visual Timeline Lanes Area */}
      <div
        ref={containerRef}
        className="timeline-tracks-area"
        tabIndex={0}
        role="slider"
        aria-label="Conversation time scrubber"
        aria-valuemin={0}
        aria-valuemax={totalDuration}
        aria-valuenow={Math.round(playhead)}
        aria-valuetext={`${formatTime(playhead)} of ${formatTime(totalDuration)}`}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        {/* Playhead Vertical Line */}
        <div
          className="timeline-playhead-line"
          style={{ left: `${playheadPercent}%` }}
          aria-hidden="true"
        >
          <div className="playhead-handle" />
        </div>

        {/* Highlight Range (when a flag is selected) */}
        {highlightRange && (
          <div
            className="timeline-highlight-region"
            style={{
              left: `${(highlightRange[0] / totalDuration) * 100}%`,
              width: `${((highlightRange[1] - highlightRange[0]) / totalDuration) * 100}%`
            }}
            aria-hidden="true"
          />
        )}

        {/* Top Lane: You */}
        <div className="lane-row lane-you-row">
          <div className="lane-meta-label">
            <span className="lane-tag you-tag">You ({currentRole})</span>
          </div>
          <div className="lane-wave-container">
            <svg
              className="lane-wave-svg"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {youWaveform.map((pt, i) => {
                const totalPts = youWaveform.length;
                const barWidth = 1000 / totalPts;
                const x = i * barWidth;
                const barH = Math.max(2, pt.amplitude * 50);
                const y = 30 - barH / 2;
                return (
                  <rect
                    key={i}
                    x={x + barWidth * 0.15}
                    y={y}
                    width={barWidth * 0.7}
                    height={barH}
                    rx="1"
                    className="wave-bar-svg wave-bar-you"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Bottom Lane: Partner */}
        <div className="lane-row lane-partner-row">
          <div className="lane-meta-label">
            <span className="lane-tag partner-tag">Partner ({partnerName})</span>
          </div>
          <div className="lane-wave-container">
            <svg
              className="lane-wave-svg"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {partnerWaveform.map((pt, i) => {
                const totalPts = partnerWaveform.length;
                const barWidth = 1000 / totalPts;
                const x = i * barWidth;
                const barH = Math.max(2, pt.amplitude * 50);
                const y = 30 - barH / 2;
                return (
                  <rect
                    key={i}
                    x={x + barWidth * 0.15}
                    y={y}
                    width={barWidth * 0.7}
                    height={barH}
                    rx="1"
                    className="wave-bar-svg wave-bar-partner"
                  />
                );
              })}
            </svg>
          </div>

          {/* Tool event chips rendered on Assistant lane */}
          {toolTurns.map((tool) => {
            const leftPct = (tool.t / totalDuration) * 100;
            const widthPct = ((tool.end - tool.t) / totalDuration) * 100;
            return (
              <div
                key={tool.id}
                className="timeline-tool-chip"
                style={{
                  left: `${leftPct}%`,
                  width: `${Math.max(widthPct, 4)}%`
                }}
                title={`Tool event: ${tool.text} (${tool.t}s-${tool.end}s)`}
              >
                <LightningIcon size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 3 }} />
                {tool.text}
              </div>
            );
          })}
        </div>

        {/* Numbered Flag Markers per SPEC §8 & §11 */}
        <div className="timeline-flag-markers-overlay">
          {flags.map((flag, idx) => {
            const leftPct = (flag.start / totalDuration) * 100;
            const isSelected = selectedFlagId === flag.id;
            const laneClass = getFlagLaneClass(flag);

            return (
              <button
                key={flag.id}
                type="button"
                className={`timeline-flag-badge ${laneClass} ${
                  isSelected ? 'flag-selected' : ''
                }`}
                style={{ left: `${leftPct}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFlag(flag.id);
                }}
                aria-label={`Flag ${idx + 1}: ${flag.title} at ${formatTime(flag.start)}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
