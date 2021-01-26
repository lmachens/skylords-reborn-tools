import { RankingResult } from "../../lib/api";
import { connect } from "../../lib/db";

const cache = {
  timestamp: null,
  promise: null,
};
export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  if (cache.timestamp < Date.now() - 5 * 60 * 1000) {
    const client = await connect();
    const db = client.db();
    const newestRanking = await db
      .collection<RankingResult>("rankings")
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    cache.promise = db
      .collection<RankingResult>("rankings")
      .find({ timestamp: newestRanking[0].timestamp })
      .sort({ timestamp: -1 })
      .toArray();
    cache.timestamp = Date.now();
  }
  const leaderboard = await cache.promise;
  res.end(JSON.stringify(leaderboard));
}
