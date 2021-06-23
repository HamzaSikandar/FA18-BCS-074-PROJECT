var express = require("express");
var router = express.Router();
var Register = require("../src/models/registers");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/auth");

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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });

      const token = await registercustomer.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now + 60000),
        httpOnly: true,
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

    const isMatch = await bcrypt.compare(password, useremail.password);
    const token = await useremail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });
    if (isMatch) {
      console.log("login succesful");
      res.redirect("/index2");
    } else {
      res.status(201).render("login");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);
    res.clearCookie("jwt");
    console.log("logout successfully");
    await req.user.save();
    res.redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
