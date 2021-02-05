import { RankingResult } from "../../lib/api";
import { connect } from "../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const caches = {
  timestamp: null,
  promise: null,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mode } = req.query;
  console.log({ mode });
  if (typeof mode !== "string") {
    res.statusCode = 400;
    return res.end("Invalid query");
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const cache = caches[mode] || {
    timestamp: null,
    promise: null,
  };
  if (cache.timestamp < Date.now() - 5 * 60 * 1000) {
    const client = await connect();
    const db = client.db();
    const newestRanking = await db
      .collection<RankingResult>("rankings")
      .find({ mode })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    cache.promise = db
      .collection<RankingResult>("rankings")
      .find({ mode, timestamp: newestRanking[0].timestamp })
      .sort({ timestamp: -1 })
      .toArray();
    cache.timestamp = Date.now();
  }
  const leaderboard = await cache.promise;
  res.end(JSON.stringify(leaderboard));
}
