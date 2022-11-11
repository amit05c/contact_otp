const { Router } = require("express");
const { ContactModel } = require("../models/contact.model");
//const { router } = express();
const contactrouter = Router();
//const bcrypt = require("bcrypt");
const fast2sms = require("fast-two-sms");
const { OtpModel } = require("../models/otp.model");

contactrouter.post("/", async (req, res) => {
  try {
    let { name, phonenumber } = req.body;

    let newcontact = new ContactModel({ name, phonenumber });
    await newcontact.save();
    res.status(200).send("welcome to connect");
  } catch (err) {
    console.log(err);
  }
});

contactrouter.get("/all", async (req, res) => {
  try {
    let allcontact = await ContactModel.find();
    res.send(allcontact);
  } catch (err) {
    //console.log(err);
    res.status(500).send({
      error: "Contact Failed",
    });
  }
});

contactrouter.get("/sc/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let singlecontact = await ContactModel.findOne({ _id });
    res.send(singlecontact);
  } catch (err) {
    //console.log(err);
    res.status(500).send({
      error: "Contact Failed",
    });
  }
});

contactrouter.post("/otp/:_id", async (req, res) => {
  let { _id } = req.params;
  let { otp } = req.body;
  let singlecontact = await ContactModel.findOne({ _id });
  let phonenumber = singlecontact.phonenumber;
  // console.log(phonenumber);
  // res.send({ data: phonenumber });
  // console.log(req.body)
  const options = {
    authorization:
      "S6RHfqWCTmNpwyX7IB12nQt5aKl0uAGPvZUdc3YE8kLze4gsxOuqoRal1wpz3OYcErm948ZMkdPfIngN",
    message: otp,
    numbers: [phonenumber],
  };
  await fast2sms.sendMessage(options);
  let contactotp = new OtpModel({
    name: singlecontact.name,
    phonenumber: singlecontact.phonenumber,
    otp: options.message,
  });
  await contactotp.save();
  //console.log(respose);
  res.send(contactotp);
});

contactrouter.get("/otpdata", async (req, res) => {
  try {
    let allcontact = await OtpModel.find();
    res.send(allcontact);
  } catch (err) {
    //console.log(err);
    res.status(500).send({
      error: "Contact Failed",
    });
  }
});
   
contactrouter.get("/singleotpdata/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let singlecontact = await OtpModel.findOne({ _id });
  
    res.send(singlecontact);
  } catch (err) {
    //console.log(err);
    res.status(500).send({
      error: "Contact Failed",
    });
  }
});

module.exports = { contactrouter };
