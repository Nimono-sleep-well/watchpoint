import { notFound } from "next/navigation";
import Link from "next/link";
import { PlayerProfile } from "@/components/PlayerProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/players/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch player");
  }

  const player = await res.json();

  return (
    <main>
      <nav className="border-b border-[var(--border)] px-4 py-3">
        <div className="mx-auto flex max-w-[760px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-[var(--subtext)] hover:text-[var(--text)] transition-colors">
            ← Back
          </Link>
          <span className="font-bold text-[var(--primary)]">Watchpoint</span>
        </div>
      </nav>
      <PlayerProfile {...player} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/players/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return { title: "Player — Watchpoint" };
  const player = await res.json();
  return { title: `${player.handle} — Watchpoint` };
}
