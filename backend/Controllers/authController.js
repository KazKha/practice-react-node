// const bcrypt = require("bcrypt");
// const jwt    = require("jsonwebtoken");
const apiRes = { code: 400, status: "fail" };

const {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidatePassword,
  ValidateMobiles,
} = require("../utils/ReqValidation");

const login = (req, res) => {
  try {
    if (ValidateEmail(req.body.testapp.email) == false) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if (ValidateName(req.body.testapp.name) == false) {
      apiRes.message = apiResponseMessage("105");
      return res.status(400).send({ apiRes });
    }
    if (ValidateMobiles(req.body.testapp.mobile) == false) {
      apiRes.message = apiResponseMessage("110");
      return res.status(400).json({ apiRes });
    }
    res.status(201).json(req.body);
  } catch (error) {
    apiRes.message = apiResponseMessage("ERR");
    res.status(500).send({ apiRes });
  }
};

module.exports = {
  login
};
