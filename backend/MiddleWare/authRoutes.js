require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { login, getUserDetails } = require("../Controllers/authController");
const updateProfile = require("../Controllers/updateProfile");
const allUserListing = require("../Controllers/getAllUser");
const getDataOfUser = require('../Controllers/getSingleUser')
const router = express.Router();
const secretKey = process.env.JWT_SECRET;
const apiRes = { code: 400, status: "fail" };
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
        apiRes.code = 401;
        return res.status(401).send({ apiRes });
      }
      req.body.empCode = decoded.empCode;
      next();
    }
  );
};

router.post("/login", login);
router.get("/user-detail", verifyToken, getUserDetails);
router.post("/single-user-detail", verifyToken, getDataOfUser);
router.post("/update-user", verifyToken, updateProfile);
router.get("/all-users", verifyToken, allUserListing);

module.exports = router;
