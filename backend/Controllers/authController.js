// const bcrypt = require("bcrypt");
// const jwt    = require("jsonwebtoken");
const apiRes = { code: 400, status: "fail", data:{} };
const  authenticateUser = require('../Model/userModel')

const {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidateEmpCode,
  ValidateMobiles,
} = require("../utils/ReqValidation");

const    login = async (req, res) => {
  try {
    
    if (  ValidateEmail(req.body.testapp.email) == false ) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if ( ValidateEmpCode(req.body.testapp.empCode) == false ) {
      apiRes.message = apiResponseMessage("112");
      return res.status(400).send({ apiRes });
    }

    const useAuthentication =   authenticateUser(req.body.testapp);
    console.log(useAuthentication);
    if( useAuthentication){ 
      apiRes.status = 'susess';
      apiRes.message = apiResponseMessage("108");
      apiRes.code = 200;
      apiRes.data = {useAuthentication};
      return res.status(200).json({apiRes});
      
    }
    apiRes.message = apiResponseMessage("107");

    res.status(404).send({ apiRes });
  } catch (error) {
     console.log(error)
    apiRes.message = apiResponseMessage("ERR");
    return  res.status(500).send({ apiRes });
  }
};

module.exports = {
  login
};
