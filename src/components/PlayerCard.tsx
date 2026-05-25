import Image from "next/image";
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

export function PlayerCard({ id, handle, realName, country, role, photoUrl, currentTeam }: PlayerCardProps) {
  return (
    <Link
      href={`/players/${id}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--primary)] transition-colors"
    >
      <div className="flex items-start gap-3">
        {/* 顔写真 */}
        <div className="shrink-0 h-14 w-14 rounded-md overflow-hidden bg-[var(--border)]">
          {photoUrl ? (
            <Image src={photoUrl} alt={handle} width={56} height={56} className="h-full w-full object-cover object-top" unoptimized />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-2xl text-[var(--subtext)]">
              {handle[0].toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {country && (
                <span className="text-sm leading-none shrink-0" title={country}>
                  {countryToFlag(country)}
                </span>
              )}
              <span className="truncate font-bold text-[var(--text)] text-base">{handle}</span>
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

          {realName && (
            <p className="mt-0.5 truncate text-xs text-[var(--subtext)]">{realName}</p>
          )}

          {/* チーム名 + ロゴ */}
          <div className="mt-1.5 flex items-center gap-1.5">
            {currentTeam?.logoUrl && (
              <Image src={currentTeam.logoUrl} alt={currentTeam.name} width={16} height={16} className="h-4 w-4 object-contain" unoptimized />
            )}
            <span className="truncate text-xs text-[var(--subtext)]">
              {currentTeam?.name ?? "Free Agent"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
