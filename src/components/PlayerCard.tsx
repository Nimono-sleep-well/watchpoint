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

interface PlayerCardProps {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  role: string | null;
  photoUrl: string | null;
  currentTeam: { id: string; name: string; shortName: string | null; logoUrl: string | null } | null;
}

export function PlayerCard({ id, handle, realName, country, role, currentTeam }: PlayerCardProps) {
  return (
    <Link
      href={`/players/${id}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--primary)] transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {country && (
              <span className="text-lg leading-none" title={country}>
                {countryToFlag(country)}
              </span>
            )}
            <span className="truncate font-bold text-[var(--text)] text-base">{handle}</span>
          </div>
          {realName && (
            <p className="mt-0.5 truncate text-sm text-[var(--subtext)]">{realName}</p>
          )}
        </div>
        {role && (
          <span
            className="shrink-0 rounded px-2 py-0.5 text-xs font-semibold"
            style={{ color: ROLE_COLORS[role] ?? "#e5e7eb", background: `${ROLE_COLORS[role] ?? "#e5e7eb"}22` }}
          >
            {role}
          </span>
        )}
      </div>
      <p className="mt-2 truncate text-sm text-[var(--subtext)]">
        {currentTeam?.name ?? "Free Agent"}
      </p>
    </Link>
  );
}
