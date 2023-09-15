const { getAll } = require("../Model/userModel");
const { apiResponseMessage } = require("../utils/ReqValidation");

const allUserListing = async (req, res) => {
  let apiRes = { code: 400, status: "fail" };
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * 10;
    const endIndex = 10;

    const usersList = await getAll(startIndex, endIndex);
    console.log(usersList.length);
    if (usersList && Object.keys(usersList).length > 0) {
      apiRes.status = "sucess";
      apiRes.message = apiResponseMessage("108");
      apiRes.code = 200;
      apiRes.pageno = page ;
      apiRes.data = usersList;
      return res.status(200).json({ apiRes });
    }

    apiRes.message = apiResponseMessage("DNF");
    return res.status(400).send({ apiRes });
  } catch (error) {
    console.log("----->");
    console.log(error);
    apiRes.message = apiResponseMessage("ERR");
    return res.status(500).send({ apiRes });
  }
};

module.exports = allUserListing;
