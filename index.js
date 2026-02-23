import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import movieSchema from "./schemas/schema.js";
import movieResolvers from "./resolvers/resolvers.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

dotenv.config();

const app = express();

// ✅ MongoDB Atlas Connection String (Cluster4)
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster4.${process.env.CLUSTER_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster4`;

async function connectDB() {
  await mongoose.connect(DB_CONNECTION);
  console.log("✅ Connected to MongoDB Atlas");
}

async function startServer() {
  // ✅ Connect DB first
  try {
    await connectDB();
  } catch (error) {
    console.log(`❌ Unable to connect to DB: ${error.message}`);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs: movieSchema,
    resolvers: movieResolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();