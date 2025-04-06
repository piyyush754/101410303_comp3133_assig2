// src/server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const authMiddleware = require("./middleware/auth");

dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Use our custom auth middleware to attach user info to req
app.use(authMiddleware);

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Pass the authenticated user (if any) into GraphQL context
    return { user: req.user };
  },
  formatError: (err) => {
    // Optionally customize error formatting
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  },
});

// For Vercel deployment - use an async function
async function initServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  connectDB();

  // default route for the home page
  app.get("/", (req, res) => {
    res.send(
      "Employee Management System API is Live! Visit /graphql to access the GraphQL API."
    );
  });

  return app;
}

// For local development
if (process.env.NODE_ENV !== "production") {
  (async () => {
    const localApp = await initServer();
    const PORT = process.env.PORT || 4000;
    localApp.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })();
}

// Export for Vercel serverless function
module.exports = initServer;
