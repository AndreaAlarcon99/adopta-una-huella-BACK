// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const { isAuthenticated } = require('./middleware/jwt.middleware')
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();
require("./config")(app);


// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const animalRoutes = require("./routes/animal.routes");
app.use("/", isAuthenticated, animalRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", isAuthenticated, userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
