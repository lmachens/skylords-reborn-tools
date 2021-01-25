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
  await db.collection("stats").createIndexes([{ key: { timestmap: -1 } }]);
  return client;
};
