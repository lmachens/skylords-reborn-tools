import { MongoClient } from "mongodb";

export const connect = async () => {
  const client = new MongoClient(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  });

  return await client.connect();
};
