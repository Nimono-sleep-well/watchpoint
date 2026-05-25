"use client";

import Image from "next/image";

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
  logoUrl?: string | null;
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
  photoUrl: string | null;
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
  photoUrl,
  liquipediaUrl,
  currentTeam,
  rosters,
  transfers,
}: PlayerProfileProps) {
  return (
    <div className="mx-auto max-w-[760px] space-y-6 px-4 py-8">
      {/* ヘッダー */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex gap-5">
          {/* 顔写真 */}
          <div className="shrink-0 h-24 w-24 rounded-lg overflow-hidden bg-[var(--border)]">
            {photoUrl ? (
              <Image src={photoUrl} alt={handle} width={96} height={96} className="h-full w-full object-cover object-top" unoptimized />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-[var(--subtext)]">
                {handle[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {country && (
                <span className="text-2xl" title={country}>{countryToFlag(country)}</span>
              )}
              <h1 className="text-3xl font-bold text-[var(--text)]">{handle}</h1>
              {role && (
                <span
                  className="rounded px-3 py-1 text-sm font-semibold"
                  style={{ color: ROLE_COLORS[role] ?? "#e5e7eb", background: `${ROLE_COLORS[role] ?? "#e5e7eb"}22` }}
                >
                  {role}
                </span>
              )}
            </div>
            {realName && <p className="mt-1 text-lg text-[var(--subtext)]">{realName}</p>}
            {birthDate && (
              <p className="mt-1 text-sm text-[var(--subtext)]">Born: {birthDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* 現所属チーム */}
      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--subtext)]">Current Team</h2>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
          {currentTeam ? (
            <div className="flex items-center gap-3">
              {currentTeam.logoUrl && (
                <Image src={currentTeam.logoUrl} alt={currentTeam.name} width={32} height={32} className="h-8 w-8 object-contain" unoptimized />
              )}
              <span className="text-[var(--text)] font-medium">{currentTeam.name}</span>
            </div>
          ) : (
            <span className="text-[var(--subtext)]">Free Agent</span>
          )}
        </div>
      </section>

      {/* キャリア履歴 */}
      {rosters.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--subtext)]">Career History</h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {rosters.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 text-sm">
                {r.team.logoUrl && (
                  <Image src={r.team.logoUrl} alt={r.team.name} width={20} height={20} className="h-5 w-5 object-contain shrink-0" unoptimized />
                )}
                <span className="font-medium text-[var(--text)] flex-1">{r.team.name}</span>
                <span className="text-[var(--subtext)] shrink-0">
                  {formatDate(r.joinDate)} – {r.isActive ? "Present" : formatDate(r.leaveDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 移籍履歴 */}
      {transfers.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--subtext)]">Transfer History</h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {transfers.map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 text-sm">
                <span className="shrink-0 text-[var(--subtext)]">{t.date}</span>
                <span className="text-[var(--text)]">
                  {t.fromTeam?.name ?? "Free Agent"} → {t.toTeam?.name ?? "Free Agent"}
                </span>
                {t.note && <span className="ml-auto shrink-0 text-xs text-[var(--subtext)]">{t.note}</span>}
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
          className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline text-sm"
        >
          🔗 View on Liquipedia
        </a>
      )}
    </div>
  );
}
