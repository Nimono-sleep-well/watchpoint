import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const TEAMS = [
  {
    liquipediaId: "Dallas_Fuel",
    name: "Dallas Fuel",
    shortName: "DF",
    region: "NA",
    logoUrl: "https://liquipedia.net/commons/images/thumb/3/38/Dallas_Fuel_allmode.png/100px-Dallas_Fuel_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Dallas_Fuel",
  },
  {
    liquipediaId: "Spacestation_Gaming",
    name: "Spacestation Gaming",
    shortName: "SSG",
    region: "NA",
    logoUrl: "https://liquipedia.net/commons/images/thumb/1/1a/Spacestation_Gaming_2023_allmode.png/100px-Spacestation_Gaming_2023_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Spacestation_Gaming",
  },
  {
    liquipediaId: "Twisted_Minds",
    name: "Twisted Minds",
    shortName: "TM",
    region: "EMEA",
    logoUrl: "https://liquipedia.net/commons/images/thumb/2/24/Twisted_Minds_2023_allmode.png/100px-Twisted_Minds_2023_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Twisted_Minds",
  },
  {
    liquipediaId: "Virtus.pro",
    name: "Virtus.pro",
    shortName: "VP",
    region: "EMEA",
    logoUrl: "https://liquipedia.net/commons/images/thumb/c/c0/Virtus.pro_2019_allmode.png/100px-Virtus.pro_2019_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Virtus.pro",
  },
  {
    liquipediaId: "Weibo_Gaming",
    name: "Weibo Gaming",
    shortName: "WBG",
    region: "APAC",
    logoUrl: "https://liquipedia.net/commons/images/thumb/2/20/Weibo_allmode.png/100px-Weibo_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Weibo_Gaming",
  },
  {
    liquipediaId: "All_Gamers",
    name: "All Gamers",
    shortName: "AG",
    region: "APAC",
    logoUrl: "https://liquipedia.net/commons/images/thumb/c/cf/All_Gamers_allmode.png/100px-All_Gamers_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/All_Gamers",
  },
  {
    liquipediaId: "ZETA_DIVISION",
    name: "ZETA DIVISION",
    shortName: "ZETA",
    region: "APAC",
    logoUrl: "https://liquipedia.net/commons/images/thumb/4/4f/ZETA_DIVISION_lightmode.png/100px-ZETA_DIVISION_lightmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/ZETA_DIVISION",
  },
  {
    liquipediaId: "Crazy_Raccoon",
    name: "Crazy Raccoon",
    shortName: "CR",
    region: "APAC",
    logoUrl: "https://liquipedia.net/commons/images/thumb/f/fc/Crazy_Raccoon_2021_allmode.png/100px-Crazy_Raccoon_2021_allmode.png",
    liquipediaUrl: "https://liquipedia.net/overwatch/Crazy_Raccoon",
  },
];

const PLAYERS: {
  liquipediaId: string;
  handle: string;
  country: string;
  role: Role;
  photoUrl: string | null;
  liquipediaUrl: string;
  teamId: string;
}[] = [
  // Dallas Fuel
  { liquipediaId: "Kronik", handle: "Kronik", country: "US", role: Role.DPS, photoUrl: null, liquipediaUrl: "https://liquipedia.net/overwatch/Kronik", teamId: "Dallas_Fuel" },
  { liquipediaId: "SeonJun", handle: "SeonJun", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/e/e6/All_Gamers_Global_SeonJun_at_the_2025_Esports_World_Cup.jpg/600px-All_Gamers_Global_SeonJun_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/SeonJun", teamId: "Dallas_Fuel" },
  { liquipediaId: "Kellan", handle: "Kellan", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/2/27/Kellan_OWCS_Finals_2024.jpeg/600px-Kellan_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/Kellan", teamId: "Dallas_Fuel" },
  { liquipediaId: "Cjay", handle: "Cjay", country: "US", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/8/86/Cjay_OWCS_Finals_2024.jpeg/600px-Cjay_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/Cjay", teamId: "Dallas_Fuel" },
  { liquipediaId: "Lukemino", handle: "Lukemino", country: "US", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/e/e1/Sign_Esports_Lukemino_at_Esports_World_Cup_2025.jpg/600px-Sign_Esports_Lukemino_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Lukemino", teamId: "Dallas_Fuel" },

  // Spacestation Gaming
  { liquipediaId: "Sugarfree", handle: "Sugarfree", country: "US", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/7/7d/Sugarfree_OWCS_Finals_2024.jpeg/600px-Sugarfree_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/Sugarfree", teamId: "Spacestation_Gaming" },
  { liquipediaId: "Lethal", handle: "Lethal", country: "TR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/5/59/Lethal_london_spitfire_2023_HD.png/600px-Lethal_london_spitfire_2023_HD.png", liquipediaUrl: "https://liquipedia.net/overwatch/Lethal", teamId: "Spacestation_Gaming" },
  { liquipediaId: "Hawk", handle: "Hawk", country: "US", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/e/e2/Hawk_OWCS_Major_2024.jpg/600px-Hawk_OWCS_Major_2024.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Hawk", teamId: "Spacestation_Gaming" },
  { liquipediaId: "Admiral", handle: "Admiral", country: "EE", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/0/07/GK_Admiral_at_Esports_World_Cup_2025.jpg/600px-GK_Admiral_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Admiral", teamId: "Spacestation_Gaming" },
  { liquipediaId: "UltraViolet", handle: "UltraViolet", country: "US", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/b/b6/UltraViolet_OWCS_Finals_2024.jpeg/600px-UltraViolet_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/UltraViolet", teamId: "Spacestation_Gaming" },

  // Twisted Minds
  { liquipediaId: "Quartz", handle: "Quartz", country: "SA", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/5/51/Quartz_OWCS_Finals_2024.jpeg/600px-Quartz_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/Quartz", teamId: "Twisted_Minds" },
  { liquipediaId: "Youbi", handle: "Youbi", country: "SA", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/b/b0/Twisted_Minds_Youbi_at_the_2024_Esports_World_Cup.jpg/600px-Twisted_Minds_Youbi_at_the_2024_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Youbi", teamId: "Twisted_Minds" },
  { liquipediaId: "JaeWoo", handle: "JaeWoo", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/5/5f/Virtus.pro_JaeWoo_at_Esports_World_Cup_2025.jpg/600px-Virtus.pro_JaeWoo_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/JaeWoo", teamId: "Twisted_Minds" },
  { liquipediaId: "TVNT", handle: "TVNT", country: "SA", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/e/e6/TVNT_OWCS_Finals_2024.jpeg/600px-TVNT_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/TVNT", teamId: "Twisted_Minds" },
  { liquipediaId: "KSAA", handle: "KSAA", country: "SA", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/5/5b/2023_KSA_KSAA.jpg/600px-2023_KSA_KSAA.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/KSAA", teamId: "Twisted_Minds" },
  { liquipediaId: "FunnyAstro", handle: "FunnyAstro", country: "GB", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/2/2f/FunnyAstro_OWCS_Finals_2024.jpeg/600px-FunnyAstro_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/FunnyAstro", teamId: "Twisted_Minds" },
  { liquipediaId: "Simple", handle: "Simple", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/b/bc/Twisted_Minds_Simple_at_the_2025_Esports_World_Cup.jpg/600px-Twisted_Minds_Simple_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Simple", teamId: "Twisted_Minds" },

  // Virtus.pro
  { liquipediaId: "Seicoe", handle: "Seicoe", country: "AT", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/1/1b/Virtus.pro_Seicoe_2026.png/600px-Virtus.pro_Seicoe_2026.png", liquipediaUrl: "https://liquipedia.net/overwatch/Seicoe", teamId: "Virtus.pro" },
  { liquipediaId: "Kevster", handle: "Kevster", country: "SE", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/1/1e/Virtus.pro_Kevster_2026.png/600px-Virtus.pro_Kevster_2026.png", liquipediaUrl: "https://liquipedia.net/overwatch/Kevster", teamId: "Virtus.pro" },
  { liquipediaId: "Eisgnom", handle: "eisgnom", country: "DE", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/2/2e/Virtus.pro_Eisgnom_in_July_2025.png/600px-Virtus.pro_Eisgnom_in_July_2025.png", liquipediaUrl: "https://liquipedia.net/overwatch/Eisgnom", teamId: "Virtus.pro" },
  { liquipediaId: "Landon", handle: "Landon", country: "US", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/e/ea/Virtus.pro_Landon_2026.png/600px-Virtus.pro_Landon_2026.png", liquipediaUrl: "https://liquipedia.net/overwatch/Landon", teamId: "Virtus.pro" },
  { liquipediaId: "FiXa", handle: "FiXa", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/d/d8/Virtus.pro_FiXa_at_Esports_World_Cup_2025.jpg/600px-Virtus.pro_FiXa_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/FiXa", teamId: "Virtus.pro" },

  // Weibo Gaming
  { liquipediaId: "Leave", handle: "Leave", country: "CN", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/f/fb/Weibo_Gaming_Leave_at_the_2025_Esports_World_Cup.jpg/600px-Weibo_Gaming_Leave_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Leave", teamId: "Weibo_Gaming" },
  { liquipediaId: "Shy", handle: "Shy", country: "CN", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/4/4e/Weibo_Gaming_Shy_at_the_2025_Esports_World_Cup.jpg/600px-Weibo_Gaming_Shy_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Shy", teamId: "Weibo_Gaming" },
  { liquipediaId: "Guxue", handle: "Guxue", country: "CN", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/5/5d/Weibo_Gaming_Guxue_at_the_2025_Esports_World_Cup.jpg/600px-Weibo_Gaming_Guxue_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Guxue", teamId: "Weibo_Gaming" },
  { liquipediaId: "Sunzo", handle: "Sunzo", country: "CN", role: Role.TANK, photoUrl: null, liquipediaUrl: "https://liquipedia.net/overwatch/Sunzo", teamId: "Weibo_Gaming" },
  { liquipediaId: "LeeSooMin", handle: "LeeSooMin", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/b/b7/All_Gamers_Global_LeeSooMin_at_the_2025_Esports_World_Cup.jpg/600px-All_Gamers_Global_LeeSooMin_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/LeeSooMin", teamId: "Weibo_Gaming" },
  { liquipediaId: "MAKA", handle: "MAKA", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/9/97/All_Gamers_Global_MAKA_at_the_2025_Esports_World_Cup.jpg/600px-All_Gamers_Global_MAKA_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/MAKA", teamId: "Weibo_Gaming" },

  // All Gamers
  { liquipediaId: "Ezhan", handle: "Ezhan", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/5/5a/VAL_2022_Ezhan.png", liquipediaUrl: "https://liquipedia.net/overwatch/Ezhan", teamId: "All_Gamers" },
  { liquipediaId: "Insane", handle: "Insane", country: "CN", role: Role.DPS, photoUrl: null, liquipediaUrl: "https://liquipedia.net/overwatch/Insane", teamId: "All_Gamers" },
  { liquipediaId: "Alphari", handle: "Alphari", country: "CN", role: Role.DPS, photoUrl: null, liquipediaUrl: "https://liquipedia.net/overwatch/Alphari", teamId: "All_Gamers" },
  { liquipediaId: "Mag", handle: "Mag", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/e/eb/Mag_at_MSM_2023.jpg/600px-Mag_at_MSM_2023.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Mag", teamId: "All_Gamers" },
  { liquipediaId: "LiGe", handle: "LiGe", country: "CN", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/1/16/Weibo_Gaming_LiGe_at_the_2025_Esports_World_Cup.jpg/600px-Weibo_Gaming_LiGe_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/LiGe", teamId: "All_Gamers" },
  { liquipediaId: "Lengsa", handle: "Lengsa", country: "CN", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/0/0b/ROC_Esports_Lengsa_at_Esports_World_Cup_2025.jpg/600px-ROC_Esports_Lengsa_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Lengsa", teamId: "All_Gamers" },
  { liquipediaId: "Recall", handle: "Recall", country: "CN", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/e/ed/Recall_FR.jpg/600px-Recall_FR.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Recall", teamId: "All_Gamers" },

  // ZETA DIVISION
  { liquipediaId: "Proper", handle: "Proper", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/9/95/Team_Falcons_Proper_at_the_2025_Esports_World_Cup.jpg/600px-Team_Falcons_Proper_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Proper", teamId: "ZETA_DIVISION" },
  { liquipediaId: "Knife", handle: "knife", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/5/51/Team_Liquid_KNIFE_at_Esports_World_Cup_2025.jpg/600px-Team_Liquid_KNIFE_at_Esports_World_Cup_2025.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Knife", teamId: "ZETA_DIVISION" },
  { liquipediaId: "Mealgaru", handle: "Mealgaru", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/3/38/All_Gamers_Global_Mealgaru_at_the_2025_Esports_World_Cup.jpg/600px-All_Gamers_Global_Mealgaru_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Mealgaru", teamId: "ZETA_DIVISION" },
  { liquipediaId: "Bernar", handle: "Bernar", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/a/a7/ZETA_DIVISION_BERNAR_at_the_2024_Esports_World_Cup.jpg/600px-ZETA_DIVISION_BERNAR_at_the_2024_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Bernar", teamId: "ZETA_DIVISION" },
  { liquipediaId: "Shu", handle: "Shu", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/8/85/Crazy_Raccoon_Shu_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_Shu_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Shu", teamId: "ZETA_DIVISION" },
  { liquipediaId: "Viol2t", handle: "Viol2t", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/d/d5/ZETA_DIVISION_Viol2t_at_the_2024_Esports_World_Cup.jpg/600px-ZETA_DIVISION_Viol2t_at_the_2024_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Viol2t", teamId: "ZETA_DIVISION" },

  // Crazy Raccoon
  { liquipediaId: "LIP", handle: "LIP", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/a/a8/Crazy_Raccoon_LIP_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_LIP_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/LIP", teamId: "Crazy_Raccoon" },
  { liquipediaId: "HeeSang", handle: "HeeSang", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/7/72/Crazy_Raccoon_HeeSang_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_HeeSang_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/HeeSang", teamId: "Crazy_Raccoon" },
  { liquipediaId: "Stalk3r", handle: "Stalk3r", country: "KR", role: Role.DPS, photoUrl: "https://liquipedia.net/commons/images/thumb/a/a2/Stalk3r_OWCS_Finals_2024.jpeg/600px-Stalk3r_OWCS_Finals_2024.jpeg", liquipediaUrl: "https://liquipedia.net/overwatch/Stalk3r", teamId: "Crazy_Raccoon" },
  { liquipediaId: "MAX", handle: "MAX", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/9/9b/Crazy_Raccoon_MAX_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_MAX_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/MAX", teamId: "Crazy_Raccoon" },
  { liquipediaId: "JunBin", handle: "JunBin", country: "KR", role: Role.TANK, photoUrl: "https://liquipedia.net/commons/images/thumb/6/65/Crazy_Raccoon_Junbin_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_Junbin_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/JunBin", teamId: "Crazy_Raccoon" },
  { liquipediaId: "CH0R0NG", handle: "CH0R0NG", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/d/d9/Crazy_Raccoon_CH0R0NG_at_the_2025_Esports_World_Cup.jpg/600px-Crazy_Raccoon_CH0R0NG_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/CH0R0NG", teamId: "Crazy_Raccoon" },
  { liquipediaId: "Vigilante", handle: "vigilante", country: "KR", role: Role.SUPPORT, photoUrl: "https://liquipedia.net/commons/images/thumb/6/6b/T1_Vigilante_at_the_2025_Esports_World_Cup.jpg/600px-T1_Vigilante_at_the_2025_Esports_World_Cup.jpg", liquipediaUrl: "https://liquipedia.net/overwatch/Vigilante", teamId: "Crazy_Raccoon" },
];

async function main() {
  // 旧データを削除
  await prisma.transfer.deleteMany();
  await prisma.teamRoster.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  // チームを登録
  const teamMap = new Map<string, string>();
  for (const t of TEAMS) {
    const team = await prisma.team.create({
      data: {
        liquipediaId: t.liquipediaId,
        name: t.name,
        shortName: t.shortName,
        region: t.region,
        logoUrl: t.logoUrl,
        liquipediaUrl: t.liquipediaUrl,
      },
    });
    teamMap.set(t.liquipediaId, team.id);
  }

  // 選手を登録 + ロスター
  for (const p of PLAYERS) {
    const teamId = teamMap.get(p.teamId)!;
    const player = await prisma.player.create({
      data: {
        liquipediaId: p.liquipediaId,
        handle: p.handle,
        country: p.country,
        role: p.role,
        photoUrl: p.photoUrl,
        liquipediaUrl: p.liquipediaUrl,
      },
    });
    await prisma.teamRoster.create({
      data: {
        playerId: player.id,
        teamId,
        joinDate: new Date("2026-01-01"),
        isActive: true,
      },
    });
  }

  console.log(`Seed complete: ${TEAMS.length} teams, ${PLAYERS.length} players`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
