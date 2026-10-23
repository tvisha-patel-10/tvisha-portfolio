# Pila8 Instant Self-Review + Punch-in Redo: Demo Spec

Frontend-only interactive demo. Mocked data, simulated audio. Desktop-first, usable down to 360px. Built later in Antigravity. Stack-agnostic; suggested: React + Vite + TypeScript, plain CSS variables, one reducer for demo state, static deploy.

---

## 1. What this demo proves

After a conversation round ends, each contributor gets an instant, honest preview of what a reviewer would flag. They can then re-record only their own flagged moments, against their partner's original track, before the round is submitted. Failure is surfaced and recoverable *before* rejection, and the live conversation stays untouched (no in-call coaching).

**Primary outcome:** more submissions pass human review.
**Guardrails:** low abandonment after the review screen; redo does not make conversations sound scripted or stitched.

## 2. Locked decisions

| Topic | Decision |
|---|---|
| Redo mechanics | Only the person who owns the flag re-records, against the partner's pre-recorded track. Partner is not needed live; fixes are async. |
| Moments fixed via redo are not held against the round. New issues can still be flagged by a human reviewer. |
| Flags | Three buckets: **Flow**, **Role**, **Audio**. Each has a timestamp, plain-language reason, and owner tag: **You / Partner / Both**. |
| Timing | Review appears after every round (Round 1 of 3, etc.). |
| Verdict | Status only: **Looks good / Likely to be flagged / Likely to fail**. Never a number. Never the word "pass". Standing line on every review state: a human reviewer makes the final call. |

**Assumptions (not yet confirmed, change freely):**
- Cap: 3 redo segments per person per round, 2 takes per segment.
- Both-owned flags are assigned to **one** person to fix (the one whose turn it was); the other sees "Partner is fixing this."
- Both people see all flags and statuses; coaching tips show only on your own flags.
- Skipping is always allowed; skipped flags stay open and the status says so.
- Each round is submitted when both people have finished or skipped.

## 3. Demo cast and round

- **Maya**, plays the **User** (private role: frustrated, then relieved).
- **Dev**, plays the **Assistant** (tool-call protocol: ask, acknowledge, wait, then report).
- Scenario: *Sam moved dinner across town; User needs the new address, transit, and a calendar update.*
- Round 1 of 3. Duration 1:45. Earning rate 4 credits/min, so **7 credits** for the round.
- A demo-controls panel switches which person you are viewing as.

## 4. Screens and states

Five screens, two scenario variants. Routes are hash-based: `#/review`, `#/redo/:flagId`, `#/cleared`.

### S1. Round review (`#/review`)
Header: breadcrumb "Engaging Companion Conversations › Round 1 of 3 › Review".

**Layout (≥1024px):** left column (about 62%), right column (about 38%).
- **Status card** (top, full width): icon + status label + one-line summary + standing line.
- **Left:** two-lane timeline (You / Partner), then synced transcript.
- **Right:** flag list grouped by bucket (Flow, Role, Audio), then partner progress.
- **Sticky action bar:** primary "Fix N moments (about 1 min)", secondary "Submit without fixing", tertiary "Hear whole round".

**Flag row:** number badge, bucket icon, short title, timestamp range, owner tag, state chip (Open / Fixed / Skipped / Partner is fixing / Waiting). Selecting a row seeks the playhead and highlights the transcript range. "Fix this moment" button on rows you own.

**Initial state (failure state):** status = **Likely to be flagged**, 4 open flags, 2 yours.

### S2. Redo studio: brief and record (`#/redo/:flagId`)
Full-width focused page, back link "Back to review". Three steps shown as a stepper: **Listen, Record, Check**.

1. **Listen:** "Here's the moment." Shows flag reason, goal (what to aim for, not what to say), original transcript lines greyed as "What was said", and a **lead-in** (partner's last ~6s). Play button (simulated).
2. **Record:** big record button. On press: 3-2-1 text countdown, partner's lead-in plays, a "Your turn" cue appears, you record, press "Done" (or auto-ends at segment length in demo), then partner's lead-out plays so you can hear how it connects.
3. **Check:** see S3.

**Role-specific content in the studio:**
- Assistant, tool flag (F1): a simulated tool-state chip during recording: "Finding message…" then "Result ready" after 3s. Prompt: "Say you're checking. Read the result only once it shows as ready."
- User, emotion flag (F3): goal card shows the arc: "Start annoyed → end relieved." No replacement line is ever offered.
- Copy always says "your own words." The studio **never** supplies a script.
- A **continuity note** appears on every redo: "Keep the same meaning so your partner's next line still fits."

### S3. Take result (state of S2)
- **Checking:** 1.5s, spinner with text "Checking your take…" (live region).
- **Fixed:** green check + "That moment is fixed." Buttons: "Play your take with the original", "Keep this take" (primary), "Try once more" (secondary, if attempts remain).
- **Still flagged:** specific reason ("Still a 4-second gap before you reply"), one actionable hint, "Try again (take 2 of 2)". Primary action is retry.
- **Cap reached (2 failed takes):** "We'll keep the original for this moment. A reviewer may still flag it." Buttons: "Keep original" (primary), "Use my last take anyway".
- On keep: toast "Saved", return to S1 with the flag marked Fixed and status recalculated.

### S4. Review: in progress / waiting on partner (S1 updated)
Same screen as S1 with live updates:
- Your flags resolved but partner's still open: status stays **Likely to be flagged**, summary reads "Your moments are fixed. Waiting on Dev for 2 more." Action bar becomes "Waiting for Dev…" (disabled) plus "Submit round" appears when partner finishes.
- Partner progress card shows neutral chips ("Dev has fixed 1 of 2"). No nudge, no blame.

### S5. Round cleared (`#/cleared`)
- Status = **Looks good**. "Nothing left we'd flag in Round 1."
- Standing line. Confirmation of what happens next: "A reviewer will listen to the final version."
- **Carry forward:** one tip each from your fixed flags (e.g., Assistant: "Wait for the result before reading it."). Not a checklist.
- Primary "Start Round 2". Secondary "Review what changed" (before/after chips).

### Scenario variants (via demo controls)
- **V1 Looks good first time:** zero or only low-severity flags. S1 shows the green state with optional "Polish" items and "Submit round" as the primary action. Proves the review isn't always bad news.
- **V2 Likely to fail:** the whole mic dropped out for 22 seconds (0:50–1:12) and exceeds what redo can fix. S1 status = **Likely to fail**; flag list shows one unfixable item; actions: "Record Round 1 again with Dev" (primary) and "Submit anyway". Copy is calm and specific, not alarming.

## 5. Flows

### User (Maya)
1. Round ends, lands on S1 with **Likely to be flagged**.
2. Reads status card, sees 4 flags; 2 are hers (F3 flat opening, F2 silence, shared but assigned to her).
3. Opens F3 → S2 → records → S3 "Still flagged" (take 1, forced by demo control) → retries → "Fixed" → keeps.
4. Opens F2 → records → Fixed → keeps.
5. Status stays Likely to be flagged until Dev finishes (S4). When Dev finishes (simulated), status flips to Looks good, S5 offered.

### Assistant (Dev)
1. Same S1 view; hers/his flags are F1 (answer read before tool finished) and F4 (mic pop).
2. Opens F1 → studio with tool-state chip → records → Fixed → keeps.
3. Opens F4 → records → Fixed → keeps. S4/S5 as above, with Maya shown as partner.

### Both: partner dependency
Partner's progress is always visible, never blocking your own fixes. Both see the same status.

## 6. Status logic (mock rules)

Severity: High / Medium / Low. A flag is **open** until a take is kept as Fixed.

- **Looks good:** no open High or Medium flags. Open Low flags are shown as "Optional polish".
- **Likely to be flagged:** at least one open High or Medium flag, and all open flags are fixable within caps.
- **Likely to fail:** any open flag marked `fixable: false`, or more fixable flags than caps allow for either person.

Status recalculates after every kept take and every partner update. Skipped flags stay open.

**Never in UI copy:** "pass", "fail" (as a verdict outside the status label), percentages, scores.
**Standing line (every review state, same position):** "This is an automated preview. A human reviewer makes the final call."

## 7. Mock data

### Transcript (`t` = seconds)
```json
[
  {"id":"t1","t":0,"end":8,"who":"U","text":"Ugh, okay. So Sam moved dinner, and now it's all the way across town."},
  {"id":"t2","t":9,"end":12,"who":"A","text":"Wait, seriously? What time are you supposed to be there?"},
  {"id":"t3","t":13,"end":21,"who":"U","text":"Seven. I was gonna walk to the old place. Now the message says Maple Street, but I don't remember the number."},
  {"id":"t4","t":22,"end":27,"who":"A","text":"Mm, 'Maple Street' isn't much to go on. One sec, let me find that message."},
  {"id":"tool1","t":28,"end":34,"who":"TOOL","text":"Find updated dinner message"},
  {"id":"t5","t":31,"end":36,"who":"A","text":"It's 418 Maple Street, seven o'clock, side entrance."},
  {"id":"t6","t":36,"end":39,"who":"U","text":"Okay. And how bad is the trip from here?"},
  {"id":"t7","t":40,"end":41,"who":"A","text":"Let me check transit."},
  {"id":"tool2","t":41,"end":48,"who":"TOOL","text":"Find transit to dinner"},
  {"id":"t8","t":50,"end":55,"who":"A","text":"Take the 6:02 local. You'll be at Parkside around six fourteen."},
  {"id":"t9","t":56,"end":58,"who":"U","text":"Hm. That's... actually not bad."},
  {"id":"t10","t":66,"end":70,"who":"U","text":"Can you change the dinner location in my calendar to 418 Maple?"},
  {"id":"t11","t":71,"end":72,"who":"A","text":"Yeah, I'll update that."},
  {"id":"tool3","t":72,"end":78,"who":"TOOL","text":"Update dinner calendar location"},
  {"id":"t12","t":79,"end":82,"who":"A","text":"Done. It's in your calendar now."},
  {"id":"t13","t":84,"end":88,"who":"U","text":"Good. Now I can actually look forward to dinner."},
  {"id":"t14","t":89,"end":94,"who":"A","text":"Good. And you get a little extra time on the way over."},
  {"id":"t15","t":96,"end":100,"who":"U","text":"Yeah. Thanks, that actually helped a lot."},
  {"id":"t16","t":101,"end":104,"who":"A","text":"Anytime. Have a good dinner."}
]
```

### Flags
```json
[
  {"id":"F3","bucket":"Role","kind":"emotion","start":0,"end":8,"segment":[0,10],
   "owner":"User","fixBy":"User","severity":"medium","fixable":true,
   "title":"Opening sounded calm",
   "reason":"Your role starts out frustrated. The opening came across even, so the relief later has less to land against.",
   "goal":"Start annoyed that plans changed. A little exasperation is plenty.",
   "leadIn":null,"leadOut":"t2"},
  {"id":"F1","bucket":"Role","kind":"tool-use","start":31,"end":36,"segment":[22,36],
   "owner":"Assistant","fixBy":"Assistant","severity":"high","fixable":true,
   "title":"Address read before the lookup finished",
   "reason":"The result was spoken at 0:31, but the tool result didn't appear until 0:34.",
   "goal":"Say you're checking, then wait. Read the result only once it shows as ready.",
   "leadIn":"t3","leadOut":"t6"},
  {"id":"F2","bucket":"Flow","kind":"silence","start":58,"end":65,"segment":[56,70],
   "owner":"Both","fixBy":"User","severity":"medium","fixable":true,
   "title":"7 seconds of silence",
   "reason":"A long pause followed the transit answer, with no 'hm' or 'okay' to show you were listening.",
   "goal":"React while you're thinking, then make the calendar request when you're ready.",
   "leadIn":"t8","leadOut":"t11"},
  {"id":"F4","bucket":"Audio","kind":"plosive","start":79,"end":81,"segment":[78,84],
   "owner":"Assistant","fixBy":"Assistant","severity":"medium","fixable":true,
   "title":"Mic pop on \"Done\"",
   "reason":"A burst of air hit the mic on a hard consonant and distorted the audio.",
   "goal":"Angle the mic just past your mouth or move it a hand-width back.",
   "leadIn":"tool3","leadOut":"t13"}
]
```
Informational (not a flag): "Airtime was balanced (Maya 46% / Dev 54%)." Shown as a quiet positive.

### V2 unfixable flag
```json
{"id":"F9","bucket":"Audio","kind":"dropout","start":50,"end":72,"owner":"Both","severity":"high","fixable":false,
 "title":"Both tracks dropped out for 22 seconds",
 "reason":"The connection broke between 0:50 and 1:12. That's more than a redo can replace."}
```

### Redo take outcomes
Deterministic, controlled by demo controls (see §13). Default: **first take on F3 is still flagged** ("Still sounds even. Try letting a little frustration into 'across town'."), second take fixed. All other flags: first take fixed.

## 8. Interaction details

- **Timeline:** two lanes (You on top, Partner below), procedural waveform from a fixed seed. Silence rendered as a flat line. Pop rendered as a spike at 1:19–1:21. Flag markers are numbered badges on the owner's lane (Both: spans both). Tool events as small chips on the Assistant lane.
- **Playback (simulated):** play/pause advances the playhead in real time. Click or drag to scrub. Transcript turn highlights follow the playhead. Persistent small label: "Demo: audio is simulated." No sound in v1.
- **Flag selection:** click row → playhead seeks to 2s before the flag, range highlighted on timeline and transcript, row expands to show reason and (for your flags) coaching tip.
- **Recording (simulated):** pressing Record starts a visual meter (random smooth amplitude), a timer shown as text, and the partner lead-in chip animates. No microphone access is requested.
- **Check result:** delayed 1.5s; result comes from demo control. Focus moves to the result heading.
- **Keeping a take:** updates flag state to Fixed, shows toast (3s), returns to S1 with focus on the next open flag you own, or the status card if none.
- **Partner simulation:** a partner-progress timer completes partner fixes in about 25s of demo time. Controls can pause, complete, or set partner to Skipped.
- **Submit without fixing:** opens a confirmation dialog: "Submit with 2 moments still open? A reviewer may flag them. You can fix them now instead." Buttons: "Fix them now" (primary), "Submit anyway".
- **Persistence:** none. Reloading resets to initial state (except demo-control settings, saved in `sessionStorage`).
- **Timing:** transitions 150–200ms. Under `prefers-reduced-motion`, no countdown animation, no auto-scrolling, no animated waveform; state changes are instant.

## 9. Copy deck

**Status labels and summaries**
- Looks good: "Nothing here we'd flag."
- Likely to be flagged: "A few moments could get this round sent back. You can fix {n} of them yourself in about {m} min."
- Likely to fail: "A reviewer would likely send this round back, and a quick fix won't cover it."
- Waiting: "Your moments are fixed. Waiting on {partner} for {n} more."
- Standing line: "This is an automated preview. A human reviewer makes the final call."

**Redo framing (unpaid, honest)**
- On S1 near the primary action: "Moments you fix won't be held against this round's {credits} credits."
- In S2 header: "Re-record just this moment, about {seconds} seconds."

**Flag titles and reasons:** as in §7.

**S2 copy**
- Step 1 title: "Listen to the moment"
- Goal label: "What to aim for"
- Original label: "What was said (for reference, not a script)"
- Instruction: "Say it in your own words. Keep the same meaning so {partner}'s next line still fits."
- Record button: "Record this moment"; during recording: "Recording… press Done when you're finished"

**S3 copy**
- Fixed: "That moment is fixed." / "Hear it with the original conversation, then keep it."
- Still flagged: "Close, not quite there." + reason + "Try again (take 2 of 2)"
- Cap reached: "We'll keep the original for this moment. A reviewer may still flag it."

**S5 copy**
- Heading: "Round 1 looks good."
- Body: "A reviewer will listen to the final version."
- Carry-forward label: "One thing to keep for Round 2"

**Tone rules:** plain, specific, kind. No exclamation marks. No blame ("Dev made a mistake"); describe the moment, not the person.

## 10. Design tokens

Brand taken from the supplied screenshots (warm orange on soft neutrals). Verify contrast in build.

```css
:root{
  /* color */
  --bg:#F7F7F5; --surface:#FFFFFF; --border:#E5E2DC;
  --text:#1F2937; --text-muted:#4B5563;
  --brand:#E8742A; --brand-strong:#B45309; --brand-tint:#FEF3E2;
  --good:#15803D;  --good-tint:#E8F5EC;
  --warn:#B45309;  --warn-tint:#FEF3E2;
  --bad:#B91C1C;   --bad-tint:#FDECEC;
  --focus:#1D4ED8;
  /* lanes */
  --lane-you:#E8742A; --lane-partner:#6B7280;
  /* type */
  --font:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
  --fs-xs:12px; --fs-sm:14px; --fs-md:16px; --fs-lg:20px; --fs-xl:28px;
  /* shape + space (4pt scale) */
  --r-sm:8px; --r-md:12px; --r-lg:16px;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s6:24px; --s8:32px;
  --shadow:0 1px 2px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.05);
}
```
Rules: brand orange fills are for buttons/markers; use `--brand-strong` for orange text. Status is always icon + text + color, never color alone. Minimum touch target 44×44px. Body text ≥16px.

## 11. Accessibility (target WCAG 2.2 AA)

- **Semantics:** one `h1` per screen, landmark regions (`header`, `main`, `aside` for flag list), status card is `role="status"`.
- **Focus:** visible 3px focus ring (`--focus`) on all controls. On route change, focus goes to the page `h1`. After keeping a take, focus goes to the next open owned flag or the status card.
- **Live regions:** polite announcements for status changes, take check results, partner updates ("Dev fixed 1 of 2 moments"). Do **not** announce the recording timer every second; announce start, 30s warnings, and stop.
- **Timeline:** not mouse-only. Flag markers are buttons in tab order; Left/Right arrows move the playhead by 1s (Shift = 5s) when the timeline has focus; Enter/Space play/pause. Provide the transcript as the text equivalent, with timestamps.
- **No color-only meaning:** status chips, flag states, and lane identity all have text or icon labels.
- **Audio:** since all playback is simulated, include the transcript and a short text description of each flag (e.g., "Silence from 0:58 to 1:05") so the demo is fully usable without sound. Real build needs captions and transcript sync.
- **Motion:** respect `prefers-reduced-motion`; no autoplay; no flashing.
- **Forms/dialogs:** the confirmation dialog traps focus, closes on Esc, returns focus to its trigger.
- **Targets and zoom:** works at 200% zoom and 320px width without horizontal scroll (excluding the timeline, which scrolls inside its own region with a visible label).
- **Language:** plain wording at a roughly 8th-grade reading level.

## 12. Responsive behavior

- **≥1024px:** two-column S1 as described.
- **640–1023px:** single column. Order: status card, flag list, timeline, transcript. Action bar sticks to the bottom.
- **<640px:** timeline collapses to a compact single-lane scrubber with flag markers; tapping a marker opens the flag detail as a bottom sheet. Studio stepper becomes "Step 2 of 3" text. Record button is full-width.
- Studio layout is single column at all sizes, so it needs little adaptation.

## 13. Demo controls panel

Floating panel, toggled with a visible "Demo controls" button (bottom-left), collapsed by default. Fully keyboard-accessible. State lives in `sessionStorage`; "Reset demo" clears it.

| Control | Options | Purpose |
|---|---|---|
| View as | User (Maya) / Assistant (Dev) | Swap perspective without reload |
| Scenario | Likely to be flagged (default) / Looks good / Likely to fail | Trigger each status |
| Take outcome | Default (F3 fails once) / Always fixed / Always still flagged | Show retry and cap states |
| Partner | Working (auto, ~25s) / Complete now / Skipped / Paused | Control S4 timing |
| Playback speed | 1× / 4× | Faster review of the timeline |
| Reduce motion | On / Off | Test the reduced-motion path |
| Reset demo | button | Return to S1 initial state |

A small "Demo" badge in the corner of every screen so the mock is never mistaken for production.

## 14. Instrumentation events (log to console in demo; real build sends to analytics)

`review_viewed {status, openFlags}` · `flag_opened {id, bucket}` · `redo_started {id}` · `take_checked {id, take, result}` · `take_kept {id, take}` · `redo_skipped {id}` · `submit_without_fixing {openFlags}` · `status_changed {from, to}` · `round_cleared` · `abandon_after_review` (derived)

Success measures for a future test: share of rounds reaching Looks good after redo, review pass rate for redo vs. non-redo rounds, % of contributors who start a redo, redo completion, drop-off after "Likely to be flagged", and reviewer naturalness ratings on spliced vs. original segments.

## 15. Out of scope

- Real audio, microphone access, waveform from real files, real splicing.
- Live matching, invitation links, device check, in-call UI (this demo starts after the call ends).
- Auth, submission backend, payments/credits logic beyond static numbers.
- Global navigation and platform chrome.
- Rounds 2 and 3 (S5 only links to "Start Round 2").
- Real flag detection; flags are fixed mock data.
- Handling of a partner who never returns (timeouts, auto-submit).
- Localization.

## 16. Open questions to confirm with Besimple (affect the real build, not the demo)

1. What exactly does "protected from rejection" mean to reviewers, and can fixed segments still be judged on new issues? Demo assumes yes.
2. Does a spliced redo sound natural to reviewers? Needs a listening test before shipping.
3. How are Both-owned flags assigned in practice (turn order, overlap starter)?
4. What happens when a partner doesn't respond in time?
5. Is the preview detector accurate enough to avoid false "Likely to fail" results that drive people away?

## 17. Acceptance checklist

- [ ] Both User and Assistant critical paths complete end to end.
- [ ] At least one failure-and-recovery path demonstrable: Likely to be flagged → redo → Looks good.
- [ ] Retry and 2-take cap states reachable via demo controls.
- [ ] Likely to fail and Looks good variants reachable.
- [ ] No number, percentage, or the word "pass" appears as a verdict anywhere.
- [ ] Standing line visible on every review state.
- [ ] No replacement lines or scripts are shown in the studio.
- [ ] Fully keyboard-operable; focus order and live regions verified.
- [ ] Usable at 360px, 768px, and 1280px.
- [ ] Demo badge and "audio is simulated" label present.

## 18. Clarifications (override earlier text where they conflict)

1. Both-owned flags. Ownership is a display tag; the fixer is set by `fixBy`.
   Viewed as the non-fixer, the row keeps its owner tag ("Both") but shows the
   chip "{Partner} is fixing" and has no "Fix this moment" button. This applies
   to every flag, so Maya sees the same chip on F1 and F4. The row still
   expands to show the reason, but not the coaching goal.

2. Lead-in / lead-out. A cue can be a speech turn, a tool event, or null.
   - Speech turn: show the transcript line and a simulated play chip.
   - Tool event: show a silent marker, e.g. "Tool running: Update dinner
     calendar location". There is nothing to play.
   - Null lead-in: show "Start of conversation" as plain text.
   The lead-out is always a speech turn in the current data.

3. Waiting state. The status badge stays "Likely to be flagged". Only the
   summary line and the action bar change. If the partner chose "Submit
   without fixing", the summary reads "{Partner} is submitting as is. {n}
   moments stay open." The action bar offers "Submit round" and
   "Review those moments".

4. V1 scenario. Use a scenario override map and never mutate the base flag
   data. In V1, F2 and F3 are shown at low severity under "Optional polish",
   and F1 and F4 are hidden. Status still comes from the same status function,
   not a hardcoded label. The primary action is "Submit round" and the
   secondary action is "Polish 2 moments (optional)". In V2, show only F9 so
   the failure is unambiguous.