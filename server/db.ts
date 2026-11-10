import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

// Ensure resilient SRV record resolution across all network environments (avoids querySrv ECONNREFUSED)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback to .env

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/madadtheory";

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
    });
    isConnected = !!conn.connections[0].readyState;
    console.log(`[Database] MongoDB Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error: any) {
    console.warn(
      `[Database] Notice: MongoDB connection failed (${error.message}). Running with in-memory fallback store until database is available.`
    );
    return false;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("[Database] MongoDB disconnected.");
});

