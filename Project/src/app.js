const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/continental", (req, res) => {
  res.render("continental");
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
