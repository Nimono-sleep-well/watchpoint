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

export function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(
    async (q: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/players/search?q=${encodeURIComponent(q)}`);
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

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, search]);

  return (
    <div className="relative">
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
          placeholder="Search players..."
          className="flex-1 bg-transparent text-[var(--text)] placeholder-[#6b7280] outline-none text-base"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); search(""); }}
            className="ml-2 text-[var(--subtext)] hover:text-[var(--text)] transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
