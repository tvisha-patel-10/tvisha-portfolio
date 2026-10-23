import type { Turn, Flag } from '../types';

export const MOCK_TRANSCRIPT: Turn[] = [
  { id: 't1', t: 0, end: 8, who: 'U', text: "Ugh, okay. So Sam moved dinner, and now it's all the way across town." },
  { id: 't2', t: 9, end: 12, who: 'A', text: "Wait, seriously? What time are you supposed to be there?" },
  { id: 't3', t: 13, end: 21, who: 'U', text: "Seven. I was gonna walk to the old place. Now the message says Maple Street, but I don't remember the number." },
  { id: 't4', t: 22, end: 27, who: 'A', text: "Mm, 'Maple Street' isn't much to go on. One sec, let me find that message." },
  { id: 'tool1', t: 28, end: 34, who: 'TOOL', text: "Find updated dinner message" },
  { id: 't5', t: 31, end: 36, who: 'A', text: "It's 418 Maple Street, seven o'clock, side entrance." },
  { id: 't6', t: 36, end: 39, who: 'U', text: "Okay. And how bad is the trip from here?" },
  { id: 't7', t: 40, end: 41, who: 'A', text: "Let me check transit." },
  { id: 'tool2', t: 41, end: 48, who: 'TOOL', text: "Find transit to dinner" },
  { id: 't8', t: 50, end: 55, who: 'A', text: "Take the 6:02 local. You'll be at Parkside around six fourteen." },
  { id: 't9', t: 56, end: 58, who: 'U', text: "Hm. That's... actually not bad." },
  { id: 't10', t: 66, end: 70, who: 'U', text: "Can you change the dinner location in my calendar to 418 Maple?" },
  { id: 't11', t: 71, end: 72, who: 'A', text: "Yeah, I'll update that." },
  { id: 'tool3', t: 72, end: 78, who: 'TOOL', text: "Update dinner calendar location" },
  { id: 't12', t: 79, end: 82, who: 'A', text: "Done. It's in your calendar now." },
  { id: 't13', t: 84, end: 88, who: 'U', text: "Good. Now I can actually look forward to dinner." },
  { id: 't14', t: 89, end: 94, who: 'A', text: "Good. And you get a little extra time on the way over." },
  { id: 't15', t: 96, end: 100, who: 'U', text: "Yeah. Thanks, that actually helped a lot." },
  { id: 't16', t: 101, end: 104, who: 'A', text: "Anytime. Have a good dinner." }
];

export const MOCK_FLAGS: Flag[] = [
  {
    id: 'F3',
    bucket: 'Role',
    kind: 'emotion',
    start: 0,
    end: 8,
    segment: [0, 10],
    owner: 'User',
    fixBy: 'User',
    severity: 'medium',
    fixable: true,
    title: 'Opening sounded calm',
    reason: 'Your role starts out frustrated. The opening came across even, so the relief later has less to land against.',
    goal: 'Start annoyed that plans changed. A little exasperation is plenty.',
    leadIn: null,
    leadOut: 't2'
  },
  {
    id: 'F1',
    bucket: 'Role',
    kind: 'tool-use',
    start: 31,
    end: 36,
    segment: [22, 36],
    owner: 'Assistant',
    fixBy: 'Assistant',
    severity: 'high',
    fixable: true,
    title: 'Address read before the lookup finished',
    reason: "The result was spoken at 0:31, but the tool result didn't appear until 0:34.",
    goal: "Say you're checking, then wait. Read the result only once it shows as ready.",
    leadIn: 't3',
    leadOut: 't6'
  },
  {
    id: 'F2',
    bucket: 'Flow',
    kind: 'silence',
    start: 58,
    end: 65,
    segment: [56, 70],
    owner: 'Both',
    fixBy: 'User',
    severity: 'medium',
    fixable: true,
    title: '7 seconds of silence',
    reason: "A long pause followed the transit answer, with no 'hm' or 'okay' to show you were listening.",
    goal: "React while you're thinking, then make the calendar request when you're ready.",
    leadIn: 't8',
    leadOut: 't11'
  },
  {
    id: 'F4',
    bucket: 'Audio',
    kind: 'plosive',
    start: 79,
    end: 81,
    segment: [78, 84],
    owner: 'Assistant',
    fixBy: 'Assistant',
    severity: 'medium',
    fixable: true,
    title: 'Mic pop on "Done"',
    reason: 'A burst of air hit the mic on a hard consonant and distorted the audio.',
    goal: 'Angle the mic just past your mouth or move it a hand-width back.',
    leadIn: 'tool3',
    leadOut: 't13'
  }
];

export const V2_UNFIXABLE_FLAG: Flag = {
  id: 'F9',
  bucket: 'Audio',
  kind: 'dropout',
  start: 50,
  end: 72,
  owner: 'Both',
  severity: 'high',
  fixable: false,
  title: 'Both tracks dropped out for 22 seconds',
  reason: "The connection broke between 0:50 and 1:12. That's more than a redo can replace."
};

export const CAST = {
  User: { name: 'Maya', role: 'User' },
  Assistant: { name: 'Dave', role: 'Assistant' }
} as const;
