"use strict";
/* jshint node: true */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const uuid = require("uuid");

const getCountries = require("./routes/get-countries");
const getLeagues = require("./routes/get-leagues");
const getTeams = require("./routes/get-teams");
const getOutstandings = require("./routes/get-outstandings");
const getFootballLeague = require("./routes/get-football-league");


const envProps = require("./env");

var appLogStream = fs.createWriteStream(path.join(__dirname, "/logs/app.log"), {
  flags: "a"
});

var logger = morgan(
  'TEST API :date Method-Type : :method HTTP Version : :url HTTP/:http-version" Status : :status  Response-Time : :response-time ms User-Agent : :user-agent', {
    stream: appLogStream
  }
);

const app = express();
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

if (envProps.enivronment !== "local") {
  app.use(logger);
}

app.use(express.static("public/dist"));

app.use(function (req, res, next) {
 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove caching so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Health service
app.use("/api/health", (req, res) => {
  res.json("App is up and running!");
});

// Services
app.use("/api/getCountries", getCountries);
app.use("/api/getLeagues", getLeagues);
app.use("/api/getTeams", getTeams);
app.use("/api/getOutstandings", getOutstandings);
app.use("/api/getFootballLeague", getFootballLeague);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});


app.listen(80, function () {
  console.log("App is running at Env:" + envProps.enivronment + " on 80 port");
});