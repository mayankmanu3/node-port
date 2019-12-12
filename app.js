var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/db");
// var indexRouter = require("./routes/index");
var bodyParser = require("body-parser");
// var usersRouter = require("./routes/users");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

var User = mongoose.model("User", userSchema);

var app = express();
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.get("/user", function(req, res, next) {
  res.redirect("/");
});

app.get("/", function(req, res, next) {
  res.render("index");
});

User.create({
  name: "mak",
  email: "hi@hi.com",
  message: "this is my message"
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
