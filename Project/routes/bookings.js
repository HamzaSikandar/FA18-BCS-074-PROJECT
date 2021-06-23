var express = require("express");
var router = express.Router();
var Booking = require("../src/models/reservation");
const auth = require("../src/middleware/auth");

router.get("/index2", auth, (req, res) => {
  console.log(`this is a cookie ${req.cookies.jwt}`);
  res.render("index2");
});

router.get("/booking", (req, res) => {
  res.render("booking");
});

router.post("/booking", async (req, res) => {
  try {
    const bookcustomer = new Booking({
      name: req.body.name,
      email: req.body.email,
      cellnumber: req.body.cellnumber,
      time: req.body.time,
      noofpeople: req.body.noofpeople,
    });
    const booked = await bookcustomer.save();
    res.render("index2");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
