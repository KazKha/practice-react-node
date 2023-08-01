const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const authRoutes = require('./MiddleWare/authRoutes');

 


// const {
//   ValidateEmail,
//   ValidateName,
//   apiResponseMessage,
//   ValidatePassword,
//   ValidateMobiles

// } = require("./utils/ReqValidation");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/auth",  authRoutes);






app.listen(PORT, () => {
  console.log("Servber Is Connected");
});
