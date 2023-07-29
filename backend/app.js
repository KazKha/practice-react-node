const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const {
  ValidateEmail,
  ValidateName,
  ValidateMobiles,
  genrateResposne 
} = require("./utils/ReqValidation");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/user", (req, res) => {
  
  if ( ValidateEmail(req.body.testapp.email) == false) {
    return res.status(400).json({ message: "Invaild Email" });
  }
  if ( ValidateName(req.body.testapp.name) == false) {
    console.log("in");
    return res.status(400).json({ message: "  Enter Only Alphabets" });
  }
  if ( ValidateMobiles(req.body.testapp.mobile) == false) {
    console.log("in");
    return res.status(400).json({ message: " Invalid Mobile Number" });
  }
  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log("Servber Is Connected");
});
