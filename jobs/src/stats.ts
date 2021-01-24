require("dotenv").config();

import { connect } from "./db";
import { getStats } from "./api";

const run = async () => {
  const client = await connect();
  const db = await client.db();
  const now = Date.now();
  const stats = await getStats();
  await db.collection("stats").insertOne({
    ...stats,
    timestamp: now,
  });
  await client.close();
  console.log("Stats refreshed");
};
run();
