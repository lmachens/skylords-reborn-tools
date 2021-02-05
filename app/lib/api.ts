export type StatsResult = {
  [key: string]: {
    count: number;
  };
}[];
export const getStats = async () => {
  const response = await fetch(`/api/stats`);
  return (await response.json()) as StatsResult;
};

export type RankingResult = {
  name: string;
  rating: number;
  activity: number;
  wins: number;
  losses: number;
  timestamp: number;
};
export type LeaderboardResult = RankingResult[];
export const getLeaderboard = async (mode) => {
  const response = await fetch(`/api/leaderboard?mode=${mode}`);
  return (await response.json()) as LeaderboardResult;
};
export const getPlayerDetails = async (mode, name: string) => {
  const response = await fetch(`/api/players/${name}?mode=${mode}`);
  return (await response.json()) as LeaderboardResult;
};
