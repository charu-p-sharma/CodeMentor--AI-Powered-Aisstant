import { connect, disconnect } from "mongoose";
import { config } from "dotenv";

async function connectToDatabase() {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is not defined in .env file");
  }
  try {
    await connect(MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("❌ Connection to MongoDB failed");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error(" ❌ Disconnection from MongoDB failed");
  }
}

export { connectToDatabase, disconnectFromDatabase };
