// Core types for Pila8 Demo per SPEC §2, §3, §4, §6, §7, §13, §18

export type Role = 'User' | 'Assistant'; // Maya = User, Dave = Assistant

export type Bucket = 'Flow' | 'Role' | 'Audio';

export type Severity = 'high' | 'medium' | 'low';

export type Owner = 'User' | 'Assistant' | 'Both';

export type FlagStatus = 'open' | 'fixed' | 'skipped';

export type ReviewStatus = 'Looks good' | 'Likely to be flagged' | 'Likely to fail';

export interface Turn {
  id: string;
  t: number;      // start in seconds
  end: number;    // end in seconds
  who: 'U' | 'A' | 'TOOL';
  text: string;
}

export interface Flag {
  id: string;
  bucket: Bucket;
  kind: string;
  start: number;
  end: number;
  segment?: [number, number];
  owner: Owner;       // display owner tag ("You", "Partner", "Both")
  fixBy?: Role;       // who can fix it
  severity: Severity;
  fixable: boolean;
  title: string;
  reason: string;
  goal?: string;      // What to aim for (shown only to the person fixing)
  leadIn?: string | null;  // Turn id, tool id, or null
  leadOut?: string | null; // Turn id
}

export type Scenario = 'default' | 'looks_good' | 'likely_to_fail';

export type TakeOutcomeMode = 'default' | 'always_fixed' | 'always_still_flagged';

export type PartnerSimMode = 'working' | 'completed' | 'skipped' | 'paused';

export interface TakeRecord {
  takeNumber: 1 | 2;
  result: 'fixed' | 'still_flagged';
  timestamp: number;
  reason?: string;
  hint?: string;
}

export interface FlagRedoState {
  attempts: TakeRecord[];
  keptTake: 'original' | 'take1' | 'take2' | null;
  status: FlagStatus;
}
