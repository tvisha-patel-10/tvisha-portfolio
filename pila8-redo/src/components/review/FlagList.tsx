import React from 'react';
import type { Flag, FlagStatus, Role, Bucket } from '../../types';
import { FlagRow } from './FlagRow';
import './FlagList.css';

interface FlagListProps {
  flags: Flag[];
  flagsState: Record<string, FlagStatus>;
  currentRole: Role;
  selectedFlagId: string | null;
  onSelectFlag: (flagId: string) => void;
  onFixFlag: (flagId: string) => void;
  isOptionalPolishOnly?: boolean;
}

const BUCKET_ORDER: Bucket[] = ['Flow', 'Role', 'Audio'];

export const FlagList: React.FC<FlagListProps> = ({
  flags,
  flagsState,
  currentRole,
  selectedFlagId,
  onSelectFlag,
  onFixFlag,
  isOptionalPolishOnly
}) => {

  // Group flags by bucket
  const groupedFlags = BUCKET_ORDER.map((bucket) => ({
    bucket,
    items: flags.filter((f) => f.bucket === bucket)
  })).filter((group) => group.items.length > 0);

  return (
    <aside className="flag-list-section" aria-label="Moments review">
      <div className="flag-list-header">
        <h3 className="flag-list-title">
          {isOptionalPolishOnly ? 'Optional polish' : 'Moments to review'}
        </h3>
        <span className="flag-count-pill">{flags.length} moments</span>
      </div>

      <div className="flag-groups">
        {groupedFlags.map((group) => (
          <div key={group.bucket} className="flag-bucket-group">
            <h4 className="bucket-heading">{group.bucket}</h4>
            <div className="bucket-rows">
              {group.items.map((flag) => {
                const flagIndex = flags.findIndex((f) => f.id === flag.id);
                const status = flagsState[flag.id] ?? 'open';
                return (
                  <FlagRow
                    key={flag.id}
                    flag={flag}
                    status={status}
                    currentRole={currentRole}
                    index={flagIndex >= 0 ? flagIndex : 0}
                    isExpanded={selectedFlagId === flag.id}
                    onToggleExpand={() => onSelectFlag(flag.id)}
                    onFix={() => onFixFlag(flag.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {flags.length === 0 && (
          <div className="no-flags-empty">
            <p>No moments flagged for this round.</p>
          </div>
        )}
      </div>

      {/* Informational quiet positive airtime item per SPEC §6, §7, §17 */}
      {!isOptionalPolishOnly && (
        <div className="airtime-note">
          <span className="airtime-icon" aria-hidden="true">ℹ</span>
          <span>Airtime was balanced between Maya and Dave.</span>
        </div>
      )}
    </aside>
  );
};
