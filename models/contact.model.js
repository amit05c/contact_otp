const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phonenumber: { type: Number, require: true },
});

const ContactModel = mongoose.model("user", ContactSchema);
module.exports = {
  ContactModel,
};
