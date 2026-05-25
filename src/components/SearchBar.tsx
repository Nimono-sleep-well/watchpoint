"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Player {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  role: string | null;
  photoUrl: string | null;
  currentTeam: { id: string; name: string; shortName: string | null; logoUrl: string | null } | null;
}

interface SearchBarProps {
  onResults: (players: Player[], query: string) => void;
}

const ROLES = ["TANK", "DPS", "SUPPORT", "FLEX"] as const;
const ROLE_COLORS: Record<string, string> = {
  TANK: "#4e9aff",
  DPS: "#ff4e4e",
  SUPPORT: "#4eff91",
  FLEX: "#c084fc",
};

export function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(
    async (q: string, r: string | null) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q });
        if (r) params.set("role", r);
        const res = await fetch(`/api/players/search?${params}`);
        const data = await res.json();
        onResults(data.players, q);
      } catch {
        onResults([], q);
      } finally {
        setLoading(false);
      }
    },
    [onResults]
  );

  // テキスト変更はdebounce
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query, role), 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, role, search]);

  function toggleRole(r: string) {
    setRole((prev) => (prev === r ? null : r));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 focus-within:border-[var(--primary)] transition-colors">
        {loading ? (
          <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
        ) : (
          <svg className="mr-3 h-4 w-4 text-[var(--subtext)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search players or teams..."
          className="flex-1 bg-transparent text-[var(--text)] placeholder-[#6b7280] outline-none text-base"
        />
        {(query || role) && (
          <button
            onClick={() => { setQuery(""); setRole(null); }}
            className="ml-2 text-[var(--subtext)] hover:text-[var(--text)] transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {ROLES.map((r) => {
          const active = role === r;
          return (
            <button
              key={r}
              onClick={() => toggleRole(r)}
              className="rounded px-3 py-1 text-xs font-semibold transition-opacity"
              style={{
                color: ROLE_COLORS[r],
                background: `${ROLE_COLORS[r]}${active ? "33" : "14"}`,
                outline: active ? `1px solid ${ROLE_COLORS[r]}` : "none",
                opacity: role && !active ? 0.45 : 1,
              }}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
