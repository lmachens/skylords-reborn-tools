import { MongoClient } from "mongodb";

let client: MongoClient = null;
export const connect = async () => {
  if (client) {
    return client;
  }
  client = new MongoClient(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  });

  return await client.connect();
};
