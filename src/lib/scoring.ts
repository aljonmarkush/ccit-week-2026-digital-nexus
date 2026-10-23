export const placementPoints = { champion: 100, firstRunnerUp: 75, secondRunnerUp: 50, participation: 10 } as const;
export type Placement = keyof typeof placementPoints;
export function calculateGroupTotal(results: Array<{ groupId: string; placement: Placement; eventId: string }>, groupId: string) {
 const uniqueEvents = new Set<string>();
 return results.reduce((total, result) => {
   if (result.groupId !== groupId || uniqueEvents.has(result.eventId)) return total;
   uniqueEvents.add(result.eventId);
   return total + placementPoints[result.placement];
 }, 0);
}
