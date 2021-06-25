const mongoose = require("mongoose");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");

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

function validateBooking(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    cellnumber: joi.number().min(13).required(),
    time: joi.string().required(),
    noofpeople: Joi.string().min(1).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports = Booking;
module.exports.validate = validateBooking;
