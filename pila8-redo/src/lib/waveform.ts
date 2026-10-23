// Seeded pseudo-random waveform generator per SPEC §8 & §10
// Returns a deterministic array of amplitude points (0.0 to 1.0) for a given lane and duration.

export interface WaveformPoint {
  time: number; // in seconds
  amplitude: number; // 0.0 to 1.0
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateWaveform(
  seed: number,
  totalSeconds: number,
  samplesPerSecond: number = 2,
  silenceRanges: [number, number][] = [],
  popRanges: [number, number][] = []
): WaveformPoint[] {
  const totalSamples = Math.ceil(totalSeconds * samplesPerSecond);
  const points: WaveformPoint[] = [];

  for (let i = 0; i < totalSamples; i++) {
    const time = i / samplesPerSecond;

    // Check if in silence range
    const isSilent = silenceRanges.some(([start, end]) => time >= start && time <= end);
    if (isSilent) {
      points.push({ time, amplitude: 0.02 }); // Rendered as flat line
      continue;
    }

    // Check if in pop range (SPEC: pop rendered as a spike at 1:19–1:21 / 79s-81s)
    const isPop = popRanges.some(([start, end]) => time >= start && time <= end);
    if (isPop) {
      points.push({ time, amplitude: 0.98 }); // Visible max spike
      continue;
    }

    // Natural undulating procedural wave
    const r1 = pseudoRandom(seed + i * 1.37);
    const r2 = pseudoRandom(seed * 2 + i * 0.73);
    const r3 = Math.sin(time * 0.8) * 0.2;
    const baseAmp = 0.25 + r1 * 0.35 + r2 * 0.2 + r3;
    const clamped = Math.max(0.08, Math.min(0.85, baseAmp));

    points.push({ time, amplitude: clamped });
  }

  return points;
}
