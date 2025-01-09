// Requirements
const express = require("express");

// App
const app = express();
const port = 3000;

// SEEDING
const seedDatabase = require("./database/seed");
seedDatabase();

// Logging
const timestamp = require("./config/router/timestamp");
app.use(timestamp);

// ROUTES
const rootRoutes = require("./routes/root");
app.use("/", rootRoutes);
const welcomeRoutes = require("./routes/welcome");
app.use("/welcome", welcomeRoutes);

// Start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
