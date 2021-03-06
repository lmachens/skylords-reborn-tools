import { MongoClient } from "mongodb";

let client: MongoClient = null;
export const connect = async () => {
  if (client) {
    return client;
  }
  client = new MongoClient(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db();
  await db.collection("stats").createIndexes([{ key: { timestamp: -1 } }]);
  await db
    .collection("rankings")
    .createIndexes([
      { key: { mode: 1, timestamp: -1 } },
      { key: { mode: 1, name: 1 } },
    ]);
  return client;
};
