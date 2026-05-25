"use client";

import { useState, useCallback } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PlayerCard } from "@/components/PlayerCard";

interface Player {
  id: string;
  handle: string;
  realName: string | null;
  country: string | null;
  role: string | null;
  currentTeam: { id: string; name: string; shortName: string | null } | null;
}

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState("");

  const handleResults = useCallback((results: Player[], q: string) => {
    setPlayers(results);
    setQuery(q);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[#f99e1a]">Watchpoint</h1>
        <p className="mt-2 text-[#6b7280]">Overwatch Pro Player Search</p>
      </header>

      <SearchBar onResults={handleResults} />

      {query && players.length === 0 && (
        <p className="mt-8 text-center text-[#6b7280]">
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

      {!query && (
        <p className="mt-12 text-center text-sm text-[#6b7280]">
          Data sourced from{" "}
          <a href="https://liquipedia.net/overwatch" target="_blank" rel="noopener noreferrer" className="text-[#f99e1a] hover:underline">
            Liquipedia
          </a>{" "}
          (CC-BY-SA 3.0)
        </p>
      )}
    </main>
  );
}
