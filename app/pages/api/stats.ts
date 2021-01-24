import { connect } from "../../lib/db";

export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const client = await connect();
  const db = client.db();
  const stats = await db
    .collection("stats")
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();
  res.end(JSON.stringify(stats));
}
