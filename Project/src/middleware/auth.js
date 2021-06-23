const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyuser = jwt.verify(
      token,
      "mynameishamzasikandarandiammakingmysemesterprojectofweb"
    );
    const user = await Register.findOne({ _id: verifyuser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.send("fsdfsdfsdf");
  }
};

module.exports = auth;
