"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Player {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  role: string | null;
  currentTeam: { id: string; name: string; shortName: string | null } | null;
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
      if (!q.trim()) {
        onResults([], "");
        return;
      }
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
      <div className="flex items-center rounded-lg border border-[#2a2d3a] bg-[#1a1d27] px-4 py-3 focus-within:border-[#f99e1a] transition-colors">
        {loading ? (
          <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-[#f99e1a] border-t-transparent" />
        ) : (
          <svg className="mr-3 h-4 w-4 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search players..."
          className="flex-1 bg-transparent text-[#e5e7eb] placeholder-[#6b7280] outline-none text-base"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); onResults([], ""); }}
            className="ml-2 text-[#6b7280] hover:text-[#e5e7eb] transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
