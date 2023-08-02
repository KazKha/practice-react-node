// const bcrypt = require("bcrypt");
// const jwt    = require("jsonwebtoken");
const apiRes = { code: 400, status: "fail" };
const  {authenticateUser} = require('../Model/userModel')

const {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidateEmpCode,
  ValidateMobiles,
} = require("../utils/ReqValidation");

const login = (req, res) => {
  try {
    
    if (  ValidateEmail(req.body.testapp.email) == false ) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if ( ValidateEmpCode(req.body.testapp.empCode) == false ) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }

    const useAuthentication = authenticateUser(req.body.testapp);

    res.status(201).json(useAuthentication);
  } catch (error) {
     console.log(error)
    apiRes.message = apiResponseMessage("ERR");
    res.status(500).send({ apiRes });
  }
};

module.exports = {
  login
};
