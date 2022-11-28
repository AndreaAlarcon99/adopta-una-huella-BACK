require("dotenv").config();
require("./db");

const { isAuthenticated } = require("./middleware/jwt.middleware");
const express = require("express");
const app = express();
require("./config")(app);


// 👇 Start handling routes here

app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/animal.routes"));
app.use("/", require("./routes/user.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
