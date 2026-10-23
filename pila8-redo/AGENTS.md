Read SPEC.md before any task. It is the source of truth.
Stack: React + Vite + TypeScript, plain CSS with variables from SPEC §10. No UI library.
No backend, no real audio, no mic access. All data is mocked.
Never show a numeric verdict or the word "pass" in UI copy.
Never write replacement lines/scripts in the redo studio.
Accessibility is required, not a polish step (SPEC §11).
After each task: run `npm run build`, fix errors, summarize changes in 3 bullets.
Reference screenshots of the old product are in /reference. Use for
visual language only, never for layout or content.
The process page (#/story) must use only the text in PROCESS_CONTENT.md.
Never invent statistics, quotes, or results. Sketches are exploratory
and must be labeled "Exploration sketch, not built" (except E).
Do not change the demo routes or demo behavior.