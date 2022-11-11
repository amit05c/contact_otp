const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phonenumber: { type: Number, require: true },
  otp: { type: Number, require: true },
});

const OtpModel = mongoose.model("otp", OtpSchema);
module.exports = {
  OtpModel,
};
