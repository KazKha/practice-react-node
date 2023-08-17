require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require('./MiddleWare/authRoutes');
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/api",  authRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Connected on port  : ${PORT}`);
});
