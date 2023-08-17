const { saveUpdate } = require("../Model/userModel");

const {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidateEmpCode,
  ValidateMobiles,
  checkAlreadyExist
} = require("../utils/ReqValidation");

const updateDetails = async (req, res) => {
  let apiRes = { code : 400};
  const bodyReq = req.body.testapp;
  try {
    checkAlreadyExist( tables = 'employees', feildsName = '*', condition = `email = '${bodyReq.email}'`)
    checkAlreadyExist( tables = 'employees', feildsName = '*', condition = `mobile = '${bodyReq.mobile}'`)

    if ( ValidateName(bodyReq.firstName) == false ) {
      apiRes.message = apiResponseMessage("105");
      return res.status(400).send({ apiRes });
    }
    if ( ValidateName(bodyReq.lastName) == false ) {
      apiRes.message = apiResponseMessage("105");
      return res.status(400).send({ apiRes });
    }
    if (ValidateEmail(bodyReq.email) == false) {
      apiRes.message = apiResponseMessage("101");
      return res.status(400).send({ apiRes });
    }
    if (ValidateMobiles(bodyReq.mobile) == false) {
      apiRes.message = apiResponseMessage("110");
      return res.status(400).send({ apiRes });
    }
    if (!bodyReq.jobTitle) {
      apiRes.message = apiResponseMessage("114", "Job Title");
      return res.status(400).send({ apiRes });
    }

    // const useAuthentication = await authenticateUser(bodyReq);

    // if (typeof useAuthentication === `object`) {
    //   const payload = {
    //     name: useAuthentication.firstName + " " + useAuthentication.lastName,
    //     email: useAuthentication.email,
    //     empCode: useAuthentication.employeeNumber,
    //   };
    //   let tokenKey = jwt.sign(payload, secretKey, {
    //     algorithm: "HS256",
    //     expiresIn: "1m",
    //   });
    //   apiRes.status = "sucess";
    //   apiRes.message = apiResponseMessage("108");
    //   apiRes.code = 200;
    //   apiRes.data = useAuthentication;
    //   apiRes.tokenKey = tokenKey;
    //   return res.status(200).json({ apiRes });
    // }
    apiRes.message = apiResponseMessage("107");
    return res.status(500).send({ apiRes });
  } catch (error) {
    console.log("----->");
    console.log(error);
    apiRes.message = apiResponseMessage("ERR");
    return res.status(500).send({ apiRes });
  }
};

module.exports = updateDetails;
