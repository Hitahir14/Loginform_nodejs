const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/formdata")
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
