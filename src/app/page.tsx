"use client";

import { useState, useCallback, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PlayerCard } from "@/components/PlayerCard";

interface Player {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  role: string | null;
  photoUrl: string | null;
  currentTeam: { id: string; name: string; shortName: string | null; logoUrl: string | null } | null;
}

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/players/search?q=")
      .then((r) => r.json())
      .then((data) => setPlayers(data.players));
  }, []);

  const handleResults = useCallback((results: Player[], q: string) => {
    setPlayers(results);
    setQuery(q);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[var(--primary)]">Watchpoint</h1>
        <p className="mt-2 text-[var(--subtext)]">Overwatch Pro Player Search</p>
      </header>

      <SearchBar onResults={handleResults} />

      {query && players.length === 0 && (
        <p className="mt-8 text-center text-[var(--subtext)]">
          No players found for &ldquo;{query}&rdquo;
        </p>
      )}

      {players.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((p) => (
            <PlayerCard key={p.id} {...p} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-[var(--subtext)]">
        Data sourced from{" "}
        <a href="https://liquipedia.net/overwatch" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
          Liquipedia
        </a>{" "}
        (CC-BY-SA 3.0)
      </p>
    </main>
  );
}
