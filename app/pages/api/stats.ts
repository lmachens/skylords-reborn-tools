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
    cache.promise = db
      .collection("stats")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    cache.timestamp = Date.now();
  }
  const stats = await cache.promise;
  res.end(JSON.stringify(stats));
}
