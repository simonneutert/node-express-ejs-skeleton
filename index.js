// Requirements
const express = require("express");
const router = express.Router();

// App
var app = express();
const port = 3000;

// Async function to start the server
async function startServer() {
  try {
    // SEEDING - Wait for database to be seeded before starting server
    console.log("🔄 Initializing database...");
    const seedDatabase = require("./database/seed");
    await seedDatabase();
    
    // Logging
    const timestamp = require("./config/router/timestamp");
    app.use(timestamp);

    // ROUTES
    var rootRoutes = require("./routes/root");
    app.use("/", rootRoutes);
    var welcomeRoutes = require("./routes/welcome");
    app.use("/welcome", welcomeRoutes);

    // Start Server
    app.listen(port, () => {
      console.log(`🚀 Server started successfully on port ${port}!`);
      console.log(`🌍 Application available at: http://localhost:${port}`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
}

// Start the application
startServer();
