import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "https://api.liquipedia.net/api/v3";

const headers = {
  Authorization: `Apikey ${process.env.LIQUIPEDIA_API_KEY}`,
  "User-Agent": `Watchpoint/1.0 (${process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/Nimono-sleep-well/watchpoint"}; rmrmrm040211@gmail.com)`,
  Accept: "application/json",
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAll<T>(path: string): Promise<T[]> {
  const results: T[] = [];
  let offset = 0;
  while (true) {
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("wiki", "overwatch");
    url.searchParams.set("limit", "100");
    url.searchParams.set("offset", String(offset));
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) {
      console.error(`API error: ${res.status} ${path}`);
      break;
    }
    const data = await res.json();
    const items: T[] = data.result ?? [];
    results.push(...items);
    if (items.length < 100) break;
    offset += 100;
    await delay(2000);
  }
  return results;
}

function parseRole(raw?: string): Role | undefined {
  if (!raw) return undefined;
  const r = raw.toUpperCase();
  if (r.includes("TANK")) return Role.TANK;
  if (r.includes("DPS") || r.includes("DAMAGE")) return Role.DPS;
  if (r.includes("SUPPORT") || r.includes("HEAL")) return Role.SUPPORT;
  if (r.includes("FLEX")) return Role.FLEX;
  return undefined;
}

async function syncTeams() {
  console.log("Syncing teams...");
  const teams = await fetchAll<{
    pagename: string;
    name: string;
    abbreviation?: string;
    region?: string;
    links?: { liquipedia?: string };
  }>("/team");

  for (const t of teams) {
    await prisma.team.upsert({
      where: { liquipediaId: t.pagename },
      update: {
        name: t.name,
        shortName: t.abbreviation ?? null,
        region: t.region ?? null,
        liquipediaUrl: t.links?.liquipedia ?? null,
      },
      create: {
        liquipediaId: t.pagename,
        name: t.name,
        shortName: t.abbreviation ?? null,
        region: t.region ?? null,
        liquipediaUrl: t.links?.liquipedia ?? null,
      },
    });
  }
  console.log(`Synced ${teams.length} teams`);
}

async function syncPlayers() {
  console.log("Syncing players...");
  const players = await fetchAll<{
    pagename: string;
    id: string;
    name?: string;
    nationality?: string;
    birthdate?: string;
    extradata?: { role?: string };
    links?: { liquipedia?: string };
  }>("/player");

  for (const p of players) {
    const role = parseRole(p.extradata?.role);
    await prisma.player.upsert({
      where: { liquipediaId: p.pagename },
      update: {
        handle: p.id || p.pagename,
        realName: p.name ?? null,
        country: p.nationality ?? null,
        birthDate: p.birthdate ? new Date(p.birthdate) : null,
        role: role ?? null,
        liquipediaUrl: p.links?.liquipedia ?? null,
      },
      create: {
        liquipediaId: p.pagename,
        handle: p.id || p.pagename,
        realName: p.name ?? null,
        country: p.nationality ?? null,
        birthDate: p.birthdate ? new Date(p.birthdate) : null,
        role: role ?? null,
        liquipediaUrl: p.links?.liquipedia ?? null,
      },
    });
  }
  console.log(`Synced ${players.length} players`);
}

async function syncSquadPlayers() {
  console.log("Syncing squad players...");
  const squads = await fetchAll<{
    player_pagename: string;
    team_pagename: string;
    joindate?: string;
    leavedate?: string;
    status: string;
  }>("/squadplayer");

  await prisma.teamRoster.updateMany({ data: { isActive: false } });

  for (const s of squads) {
    const player = await prisma.player.findUnique({ where: { liquipediaId: s.player_pagename } });
    const team = await prisma.team.findUnique({ where: { liquipediaId: s.team_pagename } });
    if (!player || !team) continue;

    const isActive = !s.leavedate || s.status === "active";
    await prisma.teamRoster.upsert({
      where: {
        id: `${player.id}-${team.id}-${s.joindate ?? "unknown"}`,
      },
      update: {
        isActive,
        leaveDate: s.leavedate ? new Date(s.leavedate) : null,
      },
      create: {
        id: `${player.id}-${team.id}-${s.joindate ?? "unknown"}`,
        playerId: player.id,
        teamId: team.id,
        joinDate: s.joindate ? new Date(s.joindate) : null,
        leaveDate: s.leavedate ? new Date(s.leavedate) : null,
        isActive,
      },
    });
  }
  console.log(`Synced ${squads.length} squad entries`);
}

async function syncTransfers() {
  console.log("Syncing transfers...");
  const transfers = await fetchAll<{
    player1_pagename: string;
    oldteam?: string;
    newteam?: string;
    date?: string;
    note?: string;
  }>("/transfer");

  for (const t of transfers) {
    if (!t.date) continue;
    const player = await prisma.player.findUnique({ where: { liquipediaId: t.player1_pagename } });
    if (!player) continue;

    const fromTeam = t.oldteam ? await prisma.team.findUnique({ where: { liquipediaId: t.oldteam } }) : null;
    const toTeam = t.newteam ? await prisma.team.findUnique({ where: { liquipediaId: t.newteam } }) : null;

    const key = `${player.id}-${t.date}-${t.oldteam ?? ""}-${t.newteam ?? ""}`;
    await prisma.transfer.upsert({
      where: { id: key },
      update: {},
      create: {
        id: key,
        playerId: player.id,
        fromTeamId: fromTeam?.id ?? null,
        toTeamId: toTeam?.id ?? null,
        date: new Date(t.date),
        note: t.note ?? null,
      },
    });
  }
  console.log(`Synced ${transfers.length} transfers`);
}

async function main() {
  try {
    await syncTeams();
    await delay(2000);
    await syncPlayers();
    await delay(2000);
    await syncSquadPlayers();
    await delay(2000);
    await syncTransfers();
    console.log("Sync complete");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
