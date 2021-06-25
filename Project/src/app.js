const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

var usersRouter = require("../routes/users");
var bookingRouter = require("../routes/bookings");

// var customersRouter = require("../routes/customerregister");

const Register = require("./models/registers");
const { ppid } = require("process");
const { extend } = require("@hapi/joi");
// const router = require("../routes/customerregister");

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", usersRouter);
app.use("/", bookingRouter);

// app.use(router);

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chinese", (req, res) => {
  res.render("chinese");
});
app.get("/italian", (req, res) => {
  res.render("italian");
});
app.get("/pakistani", (req, res) => {
  res.render("pakistani");
});
app.get("/desserts", (req, res) => {
  res.render("desserts");
});
app.get("/beverages", (req, res) => {
  res.render("beverages");
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
