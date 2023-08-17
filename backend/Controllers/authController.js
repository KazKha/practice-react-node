// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const apiRes = { code: 400, status: "fail" };
const { authenticateUser, getDetails } = require("../Model/userModel");
const secretKey = process.env.JWT_SECRET;
const {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidateEmpCode,
  ValidateMobiles,
} = require("../utils/ReqValidation");

const login = async (req, res) => {
  try {
    if (ValidateEmail(req.body.testapp.email) == false) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if (ValidateEmpCode(req.body.testapp.empCode) == false) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }
    const bodyReq = req.body.testapp;

    const useAuthentication = await authenticateUser(bodyReq);

    if (typeof useAuthentication === `object`) {
      const payload = {
        name: useAuthentication.firstName + " " + useAuthentication.lastName,
        email: useAuthentication.email,
        empCode: useAuthentication.employeeNumber,
      };
      let tokenKey = jwt.sign(payload, secretKey, {
        algorithm: "HS256",
        expiresIn: "1m",
      });
      apiRes.status = "sucess";
      apiRes.message = apiResponseMessage("108");
      apiRes.code = 200;
      apiRes.data = useAuthentication;
      apiRes.tokenKey = tokenKey;
      return res.status(200).json({ apiRes });
    }
    apiRes.message = apiResponseMessage("107");
    return res.status(500).send({ apiRes });

    res.status(404).send({ apiRes });
  } catch (error) {
    console.log("----->");
    console.log(error);
    apiRes.message = apiResponseMessage("ERR");
    return res.status(500).send({ apiRes });
  }
};

const getUserDetails = async (req, res) => {
  try {
    if (ValidateEmpCode(req.empCode) == false) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }
    const userInfo = await getDetails(req);
    if (typeof userInfo === `object`) {
      apiRes.status = "sucess";
      apiRes.message = apiResponseMessage("S");
      apiRes.code = 200;
      apiRes.data = userInfo;
     
      return res.status(200).json({ apiRes });
    }
  } catch (error) {
   
    console.log(error.message);
    apiRes.message = apiResponseMessage("ERR");
    return res.status(500).send({ apiRes });
  }
};

module.exports = {
  login,
  getUserDetails,
};
