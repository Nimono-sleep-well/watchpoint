"use client";

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
  liquipediaUrl,
  currentTeam,
  rosters,
  transfers,
}: PlayerProfileProps) {
  return (
    <div className="mx-auto max-w-[760px] space-y-6 px-4 py-8">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex flex-wrap items-center gap-3">
          {country && (
            <span className="text-3xl" title={country}>{countryToFlag(country)}</span>
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

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--subtext)]">Current Team</h2>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--text)]">
          {currentTeam?.name ?? "Free Agent"}
        </div>
      </section>

      {rosters.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--subtext)]">Career History</h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {rosters.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-[var(--text)]">{r.team.name}</span>
                <span className="text-[var(--subtext)]">
                  {formatDate(r.joinDate)} – {r.isActive ? "Present" : formatDate(r.leaveDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

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
