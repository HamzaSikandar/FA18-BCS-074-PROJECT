var express = require("express");
var router = express.Router();
var Register = require("../src/models/registers");

/* GET users listing. */
router.get("/register", (req, res) => {
  res.render("register");
});

// router.get("/users", async (req, res) => {
//   let customers = await Register.find();
//   return res.send(customers);
// });

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registercustomer = new Register({
        name: req.body.name,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });
      const registered = await registercustomer.save();
      res.render("login");
    } else {
      res.send("invalid details");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email });
    if (useremail.password === password) {
      res.render("index");
    } else {
      res.status(400).redirect("login");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
