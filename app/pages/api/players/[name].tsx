import { RankingResult } from "../../../lib/api";
import { connect } from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const caches = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { name, mode },
  } = req;
  if (typeof name !== "string" || typeof mode !== "string") {
    res.statusCode = 400;
    return res.end("Invalid query");
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const cache = caches[`${mode}-${name}`] || {
    timestamp: null,
    promise: null,
  };
  if (cache.timestamp < Date.now() - 5 * 60 * 1000) {
    const client = await connect();
    const db = client.db();

    cache.promise = db
      .collection<RankingResult>("rankings")
      .find({ mode, name })
      .sort({ timestamp: -1 })
      .toArray();
    cache.timestamp = Date.now();
  }
  const details = await cache.promise;
  res.end(JSON.stringify(details));
}
