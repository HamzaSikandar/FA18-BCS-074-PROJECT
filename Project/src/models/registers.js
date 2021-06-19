const mongoose = require("mongoose");
bcrypt = require("bcryptjs");

const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");

const customerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmpassword: String,
});

//Hashing
customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = undefined;
  }

  next();
});

const Register = mongoose.model("Register", customerSchema);
module.exports = Register;

// function validateCustomer(data) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(20).required(),
//     email: Joi.string().email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     }).required,

//     password: Joi.string().min(5).max(20).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }

// module.exports.validate = validateCustomer;
