const mongoose = require("mongoose");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");
const { func, required } = require("@hapi/joi");

const customerSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  confirmpassword: String,

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

customerSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameishamzasikandarandiammakingmysemesterprojectofweb"
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part:", error);
  }
};

//Hashing
customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10);
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
