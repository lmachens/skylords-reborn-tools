require("dotenv").config();

import { connect } from "./db";
import { get1v1Leaderboard } from "./api";

const run = async () => {
  const client = await connect();
  const db = await client.db();
  const now = Date.now();
  const rankings = await (await get1v1Leaderboard()).map((leaderboard) => ({
    name: leaderboard.name,
    rating: leaderboard.rating,
    activity: leaderboard.activity,
    wins: leaderboard.winsLimited,
    losses: leaderboard.losesLimited,
    timestamp: now,
  }));
  await db.collection("rankings").insertMany(rankings);
  await client.close();
  console.log("Leaderboard refreshed");
};
run();
