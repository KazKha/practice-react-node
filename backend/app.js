require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require('helmet');

const authRoutes = require('./MiddleWare/authRoutes');
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'example.com'],
      styleSrc: ["'self'", 'fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'cdn.example.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      connectSrc: ["'self'", 'api.example.com'],
      frameSrc: ["'self'", 'trusted.example.com'],
      objectSrc: ["'none'"],
    },
  })
);

app.use("/api",  authRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Connected on port  : ${PORT}`);
});
