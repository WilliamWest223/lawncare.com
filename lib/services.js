export const SERVICES = [
  {
    id: "mowing",
    name: "Precision Mowing",
    desc: "Sharp-blade cuts, alternating stripe patterns, crisp edging along every walk and bed.",
    price: "from $45 / visit",
    base: 45,
    perSqft: 0.004,
    icon: "M4 18h16M6 18V9m4 9V6m4 12v-8m4 8V4",
  },
  {
    id: "fertilization",
    name: "Fertilization & Weed Control",
    desc: "Six-step seasonal program that feeds your turf and starves the weeds, all season long.",
    price: "from $60 / application",
    base: 60,
    perSqft: 0.006,
    icon: "M12 3v18m0-18c3 3 3 6 0 9m0-9c-3 3-3 6 0 9",
  },
  {
    id: "cleanup",
    name: "Seasonal Cleanup",
    desc: "Spring and fall overhauls — leaves out, beds re-cut, everything hauled away.",
    price: "from $150",
    base: 150,
    perSqft: 0.008,
    icon: "M4 20l4-9 4 5 4-11 4 15H4Z",
  },
  {
    id: "landscaping",
    name: "Landscape Design",
    desc: "Beds, borders, plantings, and stonework designed to fit your home and your budget.",
    price: "custom quote",
    base: 400,
    perSqft: 0.02,
    icon: "M3 21c2-6 5-9 9-9s7 3 9 9M12 12V3m0 0L8 7m4-4 4 4",
  },
  {
    id: "aeration",
    name: "Aeration & Overseeding",
    desc: "Core aeration plus premium seed blends for turf that's thicker every year.",
    price: "from $120",
    base: 120,
    perSqft: 0.01,
    icon: "M5 5h.01M9 9h.01M15 7h.01M19 11h.01M7 15h.01M13 13h.01M17 17h.01M5 19h.01M11 19h.01",
  },
  {
    id: "irrigation",
    name: "Irrigation & Lighting",
    desc: "Smart sprinkler installs, tune-ups, and low-voltage landscape lighting.",
    price: "from $95",
    base: 95,
    perSqft: 0.005,
    icon: "M12 3c3 4.5 6 7.8 6 11a6 6 0 1 1-12 0c0-3.2 3-6.5 6-11Z",
  },
];

export const FREQUENCIES = [
  { id: "one-time", label: "One-time", multiplier: 1 },
  { id: "biweekly", label: "Every 2 weeks", multiplier: 0.92 },
  { id: "weekly", label: "Weekly", multiplier: 0.85 },
];

export function estimateTotal(lawnSize, serviceIds, frequencyId) {
  const freq = FREQUENCIES.find((f) => f.id === frequencyId) || FREQUENCIES[0];
  const total = serviceIds.reduce((sum, id) => {
    const s = SERVICES.find((x) => x.id === id);
    if (!s) return sum;
    return sum + s.base + s.perSqft * lawnSize;
  }, 0);
  return Math.round(total * freq.multiplier);
}
