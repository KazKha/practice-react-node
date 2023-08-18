// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  let apiRes ={};
  try {
    const bodyReq = req.body;
    if (ValidateEmail(bodyReq.email) == false) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if (ValidateEmpCode(bodyReq.empCode) == false) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }
    
    const useAuthentication = await authenticateUser(bodyReq);
    
    if (typeof useAuthentication === `object`) {
      const payload = {
        name: useAuthentication.firstName + " " + useAuthentication.lastName,
        email: useAuthentication.email,
        empCode: useAuthentication.employeeNumber,
      };
      let tokenKey = jwt.sign(payload, secretKey, {
        algorithm: "HS256",
        expiresIn: "20m",
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
    
  } catch (error) {
    console.log("----->");
    console.log(error);
    apiRes.message = apiResponseMessage("ERR");
    return res.status(500).send({ apiRes });
  }
};

const getUserDetails = async (req, res) => {
  let apiRes ={};
  try {
    const bodyReq = req.body;
    if (ValidateEmpCode(bodyReq.empCode) == false) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }
    const userInfo = await getDetails(bodyReq);
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
