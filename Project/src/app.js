const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");
// var cookieParser = require("cookie-parser");

var usersRouter = require("../routes/users");

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
// app.use(cookieParser());

app.use("/", usersRouter);

// app.use(router);

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.post("/register", async (req, res) => {
//   try {
//     const password = req.body.password;
//     const cpassword = req.body.confirmpassword;
//     if (password === cpassword) {
//       const registercustomer = new Register({
//         name: req.body.name,
//         email: req.body.email,
//         password: password,
//         confirmpassword: cpassword,
//       });
//       const registered = await registercustomer.save();
//       res.status(201).render("index");
//     } else {
//       res.send("invalid details");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

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
