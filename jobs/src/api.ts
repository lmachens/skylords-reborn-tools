import fetch from "node-fetch";

const fetchJSON = async <T>(url: string) => {
  const response = await fetch(url);
  return (await response.json()) as T;
};

const endpoints = [
  "accounts",
  "sessions",
  "matches",
  "matches/1v1",
  "matches/2v2",
  "matches/1pve",
  "matches/2pve",
  "matches/4pve",
  "matches/12pve",
  "matches/players",
  "matches/1rpve",
  "matches/2rpve",
  "matches/4rpve",
  "matches/1cpve",
  "matches/2cpve",
  "matches/4cpve",
  "matches/c1v1",
  "matches/c2v2",
  "matches/c3v3",
  "quests/active",
  "quests/completed",
  "quests/rerolled",
  "auctions",
  "auctions/watchers",
  "cards",
  "upgrades",
  "boosters",
  "boosters/opened",
  "boosters/spent",
  "mails",
  "decks",
  "transactions",
  "experience",
  "elo",
  "bfp",
  "gold",
  "friendlist",
  "mutelist",
  "scratch",
];
type StatsAPIResult = {
  count: number;
};
type Result = {
  [key: string]: StatsAPIResult;
};
export const getStats = async () => {
  const stats = await Promise.all(
    endpoints.map((endpoint) =>
      fetchJSON<StatsAPIResult>(
        `https://stats.backend.skylords.eu/api/${endpoint}`
      )
    )
  );
  const result = endpoints.reduce<Result>(
    (acc, endpoint, index) => ({ ...acc, [endpoint]: stats[index] }),
    {}
  );
  return result;
};

type LeaderboardsPVPCountAPIResult = {
  count: number;
};
export type LeaderboardsPVP1v1APIResult = {
  name: string;
  rating: number;
  activity: number;
  totalMatches: number;
  winsLimited: number;
  lossesLimited: number;
  baseElo: number;
};

export type LeaderboardsPVP2v2APIResult = {
  players: string[];
  baseElo: number;
  rating: number;
  activity: number;
  wins: number;
  losses: number;
};

export type PVPMode = "1v1" | "2v2";
export const getLeaderboard = async <T>(mode: PVPMode) => {
  const { count } = await fetchJSON<LeaderboardsPVPCountAPIResult>(
    `https://leaderboards.backend.skylords.eu/api/leaderboards/pvp-count/${mode}/0`
  );
  const limit = 30;
  const pages = Math.ceil(count / limit);
  let promises: Promise<T[]>[] = [];
  for (let page = 1; page <= pages; page++) {
    promises.push(
      fetchJSON<T[]>(
        `https://leaderboards.backend.skylords.eu/api/leaderboards/pvp/${mode}/0/${page}/30`
      )
    );
  }
  const leaderboards = await Promise.all(promises);
  const leaderboard = leaderboards.reduce(
    (acc, leaderboard) => [...acc, ...leaderboard],
    []
  );
  return leaderboard;
};

export const get1v1Leaderboard = () =>
  getLeaderboard<LeaderboardsPVP1v1APIResult>("1v1");

export const get2v2Leaderboard = () =>
  getLeaderboard<LeaderboardsPVP2v2APIResult>("2v2");
