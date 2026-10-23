export type Group = { id: string; name: string; tagline: string; accent: string; description: string };
export type EventItem = { slug: string; title: string; category: string; description: string; criteria: { name: string; percent: number }[]; awards: string[] };
export type ScheduleItem = { time: string; title: string; note?: string; parallel?: boolean };
