const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch(() => {
    console.log("connection failed");
  });
