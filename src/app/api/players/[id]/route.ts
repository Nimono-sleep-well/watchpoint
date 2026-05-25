import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      rosters: {
        include: { team: { select: { id: true, name: true, shortName: true } } },
        orderBy: { joinDate: "desc" },
      },
      transfers: {
        include: {
          fromTeam: { select: { id: true, name: true } },
          toTeam: { select: { id: true, name: true } },
        },
        orderBy: { date: "desc" },
      },
    },
  });

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  const currentTeam = player.rosters.find((r) => r.isActive)?.team ?? null;

  return NextResponse.json({
    id: player.id,
    handle: player.handle,
    realName: player.realName,
    country: player.country,
    birthDate: player.birthDate?.toISOString().split("T")[0] ?? null,
    role: player.role,
    liquipediaUrl: player.liquipediaUrl,
    currentTeam,
    rosters: player.rosters.map((r) => ({
      team: r.team,
      joinDate: r.joinDate?.toISOString().split("T")[0] ?? null,
      leaveDate: r.leaveDate?.toISOString().split("T")[0] ?? null,
      isActive: r.isActive,
    })),
    transfers: player.transfers.map((t) => ({
      date: t.date.toISOString().split("T")[0],
      fromTeam: t.fromTeam,
      toTeam: t.toTeam,
      note: t.note,
    })),
  });
}
