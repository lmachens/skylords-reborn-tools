import { RankingResult } from "../../../lib/api";
import { connect } from "../../../lib/db";

const caches = {};
export default async function handler(req, res) {
  const {
    query: { name },
  } = req;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const cache = caches[name] || {
    timestamp: null,
    promise: null,
  };
  if (cache.timestamp < Date.now() - 5 * 60 * 1000) {
    const client = await connect();
    const db = client.db();

    cache.promise = db
      .collection<RankingResult>("rankings")
      .find({ name })
      .sort({ timestamp: -1 })
      .toArray();
    cache.timestamp = Date.now();
  }
  const details = await cache.promise;
  res.end(JSON.stringify(details));
}