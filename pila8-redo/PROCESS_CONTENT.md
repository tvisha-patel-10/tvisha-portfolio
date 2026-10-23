# PROCESS_CONTENT.md

Source of truth for the process page at `#/story`. Use ONLY this text. Do not invent statistics, user quotes, or results. Everything here is a hypothesis or a design decision, not a finding.

Config constant to update before submitting: ACTIVE_TIME = "about 3 hours"

---

## Hero
**Title:** From "half of submissions fail" to a fixable moment
**Subtitle:** A four-hour design exploration of Pila8 conversation quality. The process first, then the working demo.
**Meta chips:** {ACTIVE_TIME} of active work · No rejection data · Worked from screenshots and a product walkthrough
**CTA:** Open the working demo

---

## 1. The problem and what I didn't know
- **Goal:** raise the share of submitted conversations that pass review. About half fail today.
- **Guardrails:** don't make the work so burdensome that qualified contributors quit, and don't make conversations sound scripted.
- **Constraints:** four-hour cap. No rejection data and no contributor access. I worked from screenshots and a walkthrough recording, so every hypothesis below is untested.

## 2. Hypotheses
Confidence labels are my judgment, not data.

| # | Hypothesis | Confidence | Why |
|---|---|---|---|
| 1 | Too much guidance upfront, little recalled mid-call | High | The guide is a long list of rules, and nothing brings it back during the call |
| 2 | Failures only surface at review | High | Silence, flat emotion, tool mistakes and audio defects are invisible until rejection, so people can't fix or learn |
| 3 | The dialogue walkthrough invites script-reading | Medium, untested | It may also be what makes the tool-call steps learnable |
| 4 | The Assistant role is overloaded | Medium-high | Sounding natural and following a tool protocol at once |
| 5 | The device check is too shallow | Medium, probably narrow | Only matters if audio defects dominate rejections |
| 6 | Contributors have no model of the reviewer (added) | Medium | They can't see what "pass" looks like, so they guess |
| 7 | The partner is a hidden dependency (added) | Medium | One weak track sinks both submissions, and neither person can see or repair it |

## 3. Five directions
Each card shows: name, one-line idea, how it changes behavior, User experience, Assistant experience, failure and recovery, main risk, and a sketch. Label every sketch except E: "Exploration sketch, not built".

### A. Rehearsal Round (big swing)
- **Idea:** replace the guide wall with a 90-second practice call against an AI partner, with instant scored feedback.
- **Behavior:** contributors build a felt sense of "pass" before the real call.
- **User:** practices the emotional arc (frustrated, then relieved).
- **Assistant:** practices the tool-call steps against a simulated User.
- **Failure and recovery:** a 4-second silence is flagged on a replay timeline and you retry that beat until it lands.
- **Risk:** unpaid work before paid work, and a voice-AI partner is costly to build.
- **Sketch:** practice screen with an "AI partner" card, a short timeline with one flagged silence at 0:04, and a "Try that beat again" button.

### B. Live Coach (big swing)
- **Idea:** a shared "conversation health" strip during the call: silence gap, airtime balance, backchannels, audio quality.
- **Behavior:** failures get fixed in the moment.
- **User:** sees the strip and an emotion-arc marker.
- **Assistant:** sees the strip and a tool-state chip.
- **Failure and recovery:** a gap over 3 seconds produces a soft nudge, timed for pauses; clipping pauses capture with a one-tap fix.
- **Risk:** self-consciousness and stilted talk, embarrassment when one partner is doing worse, and costly real-time analysis.
- **Sketch:** in-call screen with a slim health strip and one amber nudge pill reading "Gap of 4s. A quick 'mm' helps."

### C. Beat Rail + Tool Console (big swing)
- **Idea:** drop the line-by-line walkthrough. Show goals as beats, and turn tool calls into UI actions.
- **Behavior:** people improvise toward goals, and protocol errors fall because the protocol is a control.
- **User:** tracks arc beats ("get the address", "ask how far", "feel relieved").
- **Assistant:** uses a tool console ("Looking that up…") instead of remembering steps.
- **Failure and recovery:** a skipped beat prompts "still need the address?" so it's repaired in conversation.
- **Risk:** comprehension may drop without example lines, and it depends on the platform supporting tool-call UI.
- **Sketch:** left rail of beats (one done, one active, one pending) next to a call view with a tool console button.

### D. Deep Pre-flight
- **Idea:** upgrade the device check to measure noise floor, clipping on a loud phrase, echo and headset, plus a partner-ready handshake.
- **Behavior:** audio defects are caught before anyone records.
- **User and Assistant:** both run the same check; each sees the other's ready state.
- **Failure and recovery:** a failed clipping test gives guided fixes and a re-test.
- **Risk:** narrow. It only helps if audio is a large share of rejections.
- **Sketch:** device check with four meters, one failing with a fix hint, and a partner-ready indicator.

### E. Instant Self-Review + Punch-in Redo (chosen)
- **Idea:** after each round, show a status and the flagged moments. Each person re-records only their own flagged moments against the partner's original track.
- **Behavior:** the live conversation stays natural, and rejection becomes a fixable moment.
- **User:** reviews flags, re-records, checks the result.
- **Assistant:** same flow, including a tool-state cue in the redo.
- **Failure and recovery:** a round marked "Likely to be flagged" recovers to "Looks good" after redo.
- **Risk:** needs a trustworthy detector, adds unpaid post-call work, and a spliced redo can sound stitched.
- **Sketch:** use a screenshot of the built review screen at `/e-review.png`; fall back to a CSS sketch if missing.

## 4. How I scored them
Scores are 1 to 5, where 5 is best (low burden, low scripted-risk, easy build).

**First pass (five criteria)**

| | Pass-rate impact | Burden | Scripted risk | Build | Measurable | Total |
|---|---|---|---|---|---|---|
| A | 4 | 2 | 4 | 2 | 4 | 16 |
| B | 4 | 4 | 3 | 4 | 5 | 20 |
| C | 3 | 4 | 5 | 3 | 3 | 18 |
| D | 2 | 4 | 5 | 5 | 4 | 20 |
| E | 3 | 2 | 4 | 3 | 5 | 17 |

**After adding two criteria**

| | First-pass total | Recovery | Social safety | Total |
|---|---|---|---|---|
| A | 16 | 2 | 5 | 23 |
| B | 20 | 3 | 2 | 25 |
| C | 18 | 2 | 5 | 25 |
| D | 20 | 1 | 5 | 26 |
| E | 17 | 5 | 4 | 26 |

**Note to show on the page:** my first-pass favorite was B. I added Recovery (can a failed round be saved?) and Social safety (does feedback embarrass one partner in front of the other?) because the original five missed them. E ties D on total but has a higher ceiling, and D works better as a component of any direction than as the main bet.

## 5. Why E, and the tradeoffs
- **Why E:** it's the only direction that turns rejection into something fixable, it leaves the live conversation untouched, and its feedback arrives right after the work instead of after a rejection.
- **Redo is unpaid, framed as protecting the round's credits.** Risk: abandonment. Mitigation: it's short and capped.
- **Only the flag's owner re-records,** against the partner's original track. The partner isn't needed live. Risk: continuity, since the partner's next line was a response to the original.
- **Status, never a number.** Looks good / Likely to be flagged / Likely to fail, with a standing line that a human reviewer decides. This avoids over-promising.
- **Caps:** 3 moments per person per round, 2 takes per moment, so redo can't become re-recording the whole call.
- **Both-owned flags** are assigned to one person to fix, so redo stays one-sided.

**What would change my mind**
- Rejections are mostly audio: D leads and E shrinks.
- Rejections are mostly tool-protocol errors: C leads.
- First-timers fail far more than repeat contributors: A moves up.
- Spliced redo sounds unnatural to reviewers: retreat to feedback without redo.
- Most failures trace to the partner with no recourse: add re-match or full-round redo.

## 6. What I'd test next
1. Redo vs. no redo on review pass rate, with a holdout group.
2. Unpaid-but-protected vs. paid redo: start rate, completion, abandonment.
3. A listening test: do reviewers rate spliced segments as natural as originals?
4. Detector accuracy in shadow mode against real reviewer decisions.
5. First-time vs. repeat contributors.

## 7. Known gaps
- Audio is simulated and flags are fixed mock data.
- Rounds 2 and 3 are not built.
- "Protected from rejection" is my interpretation and unconfirmed with the review team.
- The effect of redo on reviewer perception is untested.