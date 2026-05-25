import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const role = request.nextUrl.searchParams.get("role");
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") ?? "50"), 100);

  const and = [];

  if (q.trim()) {
    and.push({
      OR: [
        { handle: { contains: q, mode: "insensitive" as const } },
        { rosters: { some: { isActive: true, team: { name: { contains: q, mode: "insensitive" as const } } } } },
      ],
    });
  }

  if (role && (Object.values(Role) as string[]).includes(role)) {
    and.push({ role: role as Role });
  }

  const where = and.length > 0 ? { AND: and } : undefined;

  const [players, total] = await Promise.all([
    prisma.player.findMany({
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
    }),
    prisma.player.count({ where }),
  ]);

  return NextResponse.json({
    players: players.map((p) => ({
      id: p.id,
      handle: p.handle,
      realName: p.realName,
      country: p.country,
      role: p.role,
      photoUrl: p.photoUrl,
      currentTeam: p.rosters[0]?.team ?? null,
    })),
    total,
  });
}
