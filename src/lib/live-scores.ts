export const LIVE_SCORES_KEY = "ccit-week-2026-live-score-updates-v1";
export const groupOptions = [
  { id: "404", name: "404 NOT FOUND" },
  { id: "retry", name: "RETRY" },
  { id: "ctrl", name: "CTRL C:V" },
] as const;
export type GroupId = (typeof groupOptions)[number]["id"];
export type ScoreUpdate = {
  id: string;
  groupId: GroupId;
  points: number;
  activity: string;
  note: string;
  date: string;
  updatedAt: string;
  updatedBy: string;
};
export function readScoreUpdates(): ScoreUpdate[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(LIVE_SCORES_KEY);
    return value ? (JSON.parse(value) as ScoreUpdate[]) : [];
  } catch { return []; }
}
export function writeScoreUpdates(updates: ScoreUpdate[]) {
  window.localStorage.setItem(LIVE_SCORES_KEY, JSON.stringify(updates));
  window.dispatchEvent(new CustomEvent("ccit-scores-updated", { detail: updates }));
}
export function totalsFromUpdates(updates: ScoreUpdate[]) {
  return groupOptions.map(group => ({
    ...group,
    points: updates.filter(update => update.groupId === group.id).reduce((sum, update) => sum + update.points, 0),
    updates: updates.filter(update => update.groupId === group.id).length,
  })).sort((a, b) => b.points - a.points);
}
