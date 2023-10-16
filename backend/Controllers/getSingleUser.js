const {  getDetails } = require("../Model/userModel");
const xss = require("xss");

const {
 
  ValidateEmpCode

} = require("../utils/ReqValidation");
const { apiResponseMessage } = require("../utils/ReqValidation");

const getDataOfUser = async (req, res) => {
    let apiRes ={};
    try {
      const bodyReq = req.body;
      console.log(bodyReq);  
      if (ValidateEmpCode(bodyReq.getDataOf) == false) {
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

module.exports = getDataOfUser;
