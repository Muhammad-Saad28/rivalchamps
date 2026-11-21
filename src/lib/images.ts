export const sportImageMap: Record<string, string> = {
  "sp-badminton-m": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop",
  "sp-badminton-f": "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=1000&auto=format&fit=crop",
  "sp-cricket-m": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop",
  "sp-cricket-f": "https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?q=80&w=1000&auto=format&fit=crop",
  "sp-football-m": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
  "sp-football-f": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
  "sp-basketball-m": "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
  "sp-basketball-f": "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1000&auto=format&fit=crop",
  "sp-table-tennis": "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1000&auto=format&fit=crop",
  "sp-ludo": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop",
  "sp-human-ludo": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
  "sp-chess": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop",
  "sp-scavenger-hunt": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop",
  "sp-tennis-ball-throw": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop",
  "sp-race": "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop",
  "sp-sack-race": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
  "sp-arm-wrestling-m": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
  "sp-arm-wrestling-f": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
  "sp-musical-chair": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
  "sp-weight": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  "sp-height": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop",
  "sp-blindfold": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
  "sp-tug-of-war-m": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1000&auto=format&fit=crop",
  "sp-tug-of-war-f": "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1000&auto=format&fit=crop",
};

export function getSportImage(sportIdOrSlug: string, category?: string): string {
  if (sportImageMap[sportIdOrSlug]) return sportImageMap[sportIdOrSlug];
  // check by slug match
  for (const [key, val] of Object.entries(sportImageMap)) {
    if (key.includes(sportIdOrSlug.toLowerCase())) {
      return val;
    }
  }
  return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop";
}
