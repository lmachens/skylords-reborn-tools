import fetch from "node-fetch";

type APIResult = {
  count: number;
};
type Result = {
  [key: string]: APIResult;
};
const fetchJSON = async (endpoint: string) => {
  const response = await fetch(
    `https://stats.backend.skylords.eu/api/${endpoint}`
  );
  return (await response.json()) as APIResult;
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
export const getStats = async () => {
  const stats = await Promise.all(endpoints.map(fetchJSON));
  const result = endpoints.reduce<Result>(
    (acc, endpoint, index) => ({ ...acc, [endpoint]: stats[index] }),
    {}
  );
  return result;
};
