const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 1111;
const dbo = require("./db/connect.js");
const mainRoute = require("./router/mainRoute");
const matchesRoute = require("./router/matchRoute");

app.use(cors());
app.use(express.json());
app.use(mainRoute);
app.use(matchesRoute);

dbo.connectToServer();
dbo.getDb();

app.listen(PORT, function () {
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
    }
  });
  console.log("Server is running on Port: " + PORT);
});
