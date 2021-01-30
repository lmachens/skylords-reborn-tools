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
  "quests/active",
  "auctions",
  "cards",
  "upgrades",
  "boosters",
  "mails",
  "decks",
  "transactions",
  "experience",
  "elo",
  "bfp",
  "gold",
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
type LeaderboardsPVP1v1APIResult = {
  name: string;
  rating: number;
  activity: number;
  totalMatches: number;
  winsLimited: number;
  lossesLimited: number;
  baseElo: number;
}[];
export const get1v1Leaderboard = async () => {
  const { count } = await fetchJSON<LeaderboardsPVPCountAPIResult>(
    "https://leaderboards.backend.skylords.eu/api/leaderboards/pvp-count/1v1/0"
  );
  const limit = 30;
  const pages = Math.ceil(count / limit);
  let promises = [];
  for (let page = 1; page <= pages; page++) {
    promises.push(
      fetchJSON<LeaderboardsPVP1v1APIResult>(
        `https://leaderboards.backend.skylords.eu/api/leaderboards/pvp/1v1/0/${page}/30`
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
