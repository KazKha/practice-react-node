const express = require("express");
const jwt = require("jsonwebtoken");
const { login, getUserDetails } = require("../Controllers/authController");
require("dotenv").config();
const router = express.Router();
const apiRes = { code: 400, status: "fail", data: {} };
const { apiResponseMessage } = require("../utils/ReqValidation");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    apiRes.message = apiResponseMessage("113");
    apiRes.code = 403;
    delete apiRes.data;
    return res.status(403).send({ apiRes });
  }
  token.replace("Bearer", "");
  jwt.verify(
    token.replace("Bearer", "").trim(),
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        apiRes.message = apiResponseMessage("AUTH");
        apiRes.code = 500;
        return res.status(500).send({ apiRes });
      }

      req.empCode = decoded.empCode;
      next();
    }
  );
};

router.post("/login", login);
router.get("/user-detail", verifyToken, getUserDetails);

module.exports = router;
