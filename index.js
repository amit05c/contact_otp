const { connection } = require("./config/db.js");
const express = require("express");
const { contactrouter } = require("./routes/contact.js");
const PORT = process.env.PORT || 7070
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Landing page");
});
app.use("/contact", contactrouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("madhuri");
  } catch (err) {
    console.log(err);
  }
});
