"use client";

import Link from "next/link";

const ROLE_COLORS: Record<string, string> = {
  TANK: "#4e9aff",
  DPS: "#ff4e4e",
  SUPPORT: "#4eff91",
  FLEX: "#c084fc",
};

function countryToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

interface Team {
  id: string;
  name: string;
  shortName?: string | null;
}

interface Roster {
  team: Team;
  joinDate: string | null;
  leaveDate: string | null;
  isActive: boolean;
}

interface Transfer {
  date: string;
  fromTeam: Team | null;
  toTeam: Team | null;
  note: string | null;
}

interface PlayerProfileProps {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  birthDate: string | null;
  role: string | null;
  liquipediaUrl: string | null;
  currentTeam: Team | null;
  rosters: Roster[];
  transfers: Transfer[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function PlayerProfile({
  handle,
  realName,
  country,
  birthDate,
  role,
  liquipediaUrl,
  currentTeam,
  rosters,
  transfers,
}: PlayerProfileProps) {
  return (
    <div className="mx-auto max-w-[760px] space-y-6 px-4 py-8">
      <div className="rounded-lg border border-[#2a2d3a] bg-[#1a1d27] p-6">
        <div className="flex flex-wrap items-center gap-3">
          {country && (
            <span className="text-3xl" title={country}>{countryToFlag(country)}</span>
          )}
          <h1 className="text-3xl font-bold text-[#e5e7eb]">{handle}</h1>
          {role && (
            <span
              className="rounded px-3 py-1 text-sm font-semibold"
              style={{ color: ROLE_COLORS[role] ?? "#e5e7eb", background: `${ROLE_COLORS[role] ?? "#e5e7eb"}22` }}
            >
              {role}
            </span>
          )}
        </div>
        {realName && <p className="mt-1 text-lg text-[#6b7280]">{realName}</p>}
        {birthDate && (
          <p className="mt-1 text-sm text-[#6b7280]">Born: {birthDate}</p>
        )}
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#6b7280]">Current Team</h2>
        <div className="rounded-lg border border-[#2a2d3a] bg-[#1a1d27] px-4 py-3 text-[#e5e7eb]">
          {currentTeam?.name ?? "Free Agent"}
        </div>
      </section>

      {rosters.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#6b7280]">Career History</h2>
          <div className="rounded-lg border border-[#2a2d3a] bg-[#1a1d27] divide-y divide-[#2a2d3a]">
            {rosters.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-[#e5e7eb]">{r.team.name}</span>
                <span className="text-[#6b7280]">
                  {formatDate(r.joinDate)} – {r.isActive ? "Present" : formatDate(r.leaveDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {transfers.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#6b7280]">Transfer History</h2>
          <div className="rounded-lg border border-[#2a2d3a] bg-[#1a1d27] divide-y divide-[#2a2d3a]">
            {transfers.map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 text-sm">
                <span className="shrink-0 text-[#6b7280]">{t.date}</span>
                <span className="text-[#e5e7eb]">
                  {t.fromTeam?.name ?? "Free Agent"} → {t.toTeam?.name ?? "Free Agent"}
                </span>
                {t.note && <span className="ml-auto shrink-0 text-xs text-[#6b7280]">{t.note}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {liquipediaUrl && (
        <a
          href={liquipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#f99e1a] hover:underline text-sm"
        >
          🔗 View on Liquipedia
        </a>
      )}
    </div>
  );
}
