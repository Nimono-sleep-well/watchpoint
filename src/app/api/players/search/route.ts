import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") ?? "20"), 50);

  const where = q.trim()
    ? { handle: { contains: q, mode: "insensitive" as const } }
    : undefined;

  const players = await prisma.player.findMany({
    where,
    include: {
      rosters: {
        where: { isActive: true },
        include: { team: { select: { id: true, name: true, shortName: true, logoUrl: true } } },
        take: 1,
      },
    },
    orderBy: { handle: "asc" },
    take: limit,
  });

  const total = await prisma.player.count({ where });

  const result = players.map((p) => ({
    id: p.id,
    handle: p.handle,
    realName: p.realName,
    country: p.country,
    role: p.role,
    photoUrl: p.photoUrl,
    currentTeam: p.rosters[0]?.team ?? null,
  }));

  return NextResponse.json({ players: result, total });
}
