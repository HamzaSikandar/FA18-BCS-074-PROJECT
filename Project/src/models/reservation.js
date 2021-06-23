const mongoose = require("mongoose");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");
const { func, required } = require("@hapi/joi");

const bookingSchema = mongoose.Schema({
  name: String,
  email: String,
  cellnumber: Number,
  time: String,
  noofpeople: String,

  //   tokens: [
  //     {
  //       token: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
