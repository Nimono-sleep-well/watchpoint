const BASE_URL = "https://api.liquipedia.net/api/v3";

const headers = {
  Authorization: `Apikey ${process.env.LIQUIPEDIA_API_KEY}`,
  "User-Agent": `Watchpoint/1.0 (${process.env.NEXT_PUBLIC_SITE_URL}; contact@watchpoint.gg)`,
  Accept: "application/json",
};

async function fetchLiquipedia<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("wiki", "overwatch");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Liquipedia API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export interface LiquipediaPlayer {
  pagename: string;
  id: string;
  name?: string;
  nationality?: string;
  birthdate?: string;
  extradata?: { role?: string };
  links?: { liquipedia?: string };
}

export interface LiquipediaTeam {
  pagename: string;
  name: string;
  abbreviation?: string;
  region?: string;
  links?: { liquipedia?: string };
}

export interface LiquipediaSquadPlayer {
  player_pagename: string;
  team_pagename: string;
  joindate?: string;
  leavedate?: string;
  status: string;
}

export interface LiquipediaTransfer {
  player1_pagename: string;
  oldteam?: string;
  newteam?: string;
  date?: string;
  extradata?: { displaydate?: string };
  note?: string;
}

export async function fetchPlayers(offset = 0): Promise<{ result: LiquipediaPlayer[] }> {
  return fetchLiquipedia("/player", { limit: "100", offset: String(offset), order: "pagename_asc" });
}

export async function fetchTeams(offset = 0): Promise<{ result: LiquipediaTeam[] }> {
  return fetchLiquipedia("/team", { limit: "100", offset: String(offset), order: "pagename_asc" });
}

export async function fetchSquadPlayers(offset = 0): Promise<{ result: LiquipediaSquadPlayer[] }> {
  return fetchLiquipedia("/squadplayer", { limit: "100", offset: String(offset) });
}

export async function fetchTransfers(offset = 0): Promise<{ result: LiquipediaTransfer[] }> {
  return fetchLiquipedia("/transfer", { limit: "100", offset: String(offset), order: "date_desc" });
}
