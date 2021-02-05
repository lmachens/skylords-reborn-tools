require("dotenv").config();

import { connect } from "./db";
import { get1v1Leaderboard, get2v2Leaderboard } from "./api";
import type { PVPMode } from "./api";
import type { Db } from "mongodb";

const refreshLeaderboard = async (db: Db, mode: PVPMode) => {};

const run = async () => {
  const client = await connect();
  const db = await client.db();
  const now = Date.now();

  const rankings1v1 = await (await get1v1Leaderboard()).map((leaderboard) => ({
    mode: "1v1",
    name: leaderboard.name,
    rating: leaderboard.rating,
    activity: leaderboard.activity,
    wins: leaderboard.winsLimited,
    losses: leaderboard.lossesLimited,
    timestamp: now,
  }));
  await db.collection("rankings").insertMany(rankings1v1);

  const rankings2v2 = await (await get2v2Leaderboard()).map((leaderboard) => ({
    mode: "2v2",
    name: leaderboard.players.join(", "),
    playerNames: leaderboard.players,
    rating: leaderboard.rating,
    activity: leaderboard.activity,
    wins: leaderboard.wins,
    losses: leaderboard.losses,
    timestamp: now,
  }));
  await db.collection("rankings").insertMany(rankings2v2);

  await client.close();
  console.log("Leaderboard refreshed");
};
run();
