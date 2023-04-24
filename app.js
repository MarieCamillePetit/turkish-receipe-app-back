var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

var indexRouter = require("./routes/index");
var receipeRouter = require("./routes/receipe");
var categoryRouter = require("./routes/category");

var mongoose = require("mongoose");

var app = express();

// Intégration de la bdd
var connectionString =
  "mongodb+srv://mariecamillepetitlpdim:pJol67R8hJlq2C3s@turkish-app-receipe.pppl3dc.mongodb.net/test";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/receipes", receipeRouter);
app.use("/categories", categoryRouter);

module.exports = app;
