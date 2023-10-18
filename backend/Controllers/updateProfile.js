const { saveUpdate, checkAlreadyExist } = require("../Model/userModel");
const xss = require("xss");

const {
    ValidateEmail,
    ValidateName,
    apiResponseMessage,
    ValidateEmpCode,
    ValidateMobiles,
} = require("../utils/ReqValidation");

const updateDetails = async (req, res) => {
    let apiRes = { code: 400 };
    const bodyReq = req.body;
    try {

        let firstName = xss(bodyReq.firstName);
        let lastName = xss(bodyReq.lastName);
        let email = xss(bodyReq.email);
        let mobile = xss(bodyReq.mobile);
        let jobTitle = xss(bodyReq.jobTitle);
        let extension = xss(bodyReq.extension);

        //// Checking EmailId Or Mobile Exist ////
        // let CheckEmailExist = await checkAlreadyExist(
        //   (tables = "employees"),
        //   (feildsName = "*"),
        //ALTER TABLE `employees` ADD `mobile` BIGINT(10) NULL DEFAULT NULL AFTER `email`;
        //   (condition = `email = '${bodyReq.email}'`)
        // );
        let CheckMobExist = await checkAlreadyExist(
            (tables = "employees"),
            (feildsName = "*"),
            (condition = `mobile = '${bodyReq.mobile}'`)
        );

        if (CheckMobExist) {
            //CheckEmailExist ||
            apiRes.message = apiResponseMessage("115");
            return res.status(400).send({ apiRes });
        }
        //// Checking EmailId Or Mobile Exist ////

        if (ValidateName(bodyReq.firstName) == false) {
            apiRes.message = apiResponseMessage("105");
            return res.status(400).send({ apiRes });
        }

        if (ValidateName(bodyReq.lastName) == false) {
            apiRes.message = apiResponseMessage("105");
            return res.status(400).send({ apiRes });
        }
        // if (ValidateEmail(bodyReq.email) == false) {
        //   apiRes.message = apiResponseMessage("101");
        //   return res.status(400).send({ apiRes });
        // }
        if (ValidateMobiles(bodyReq.mobile) == false) {
            apiRes.message = apiResponseMessage("110");
            return res.status(400).send({ apiRes });
        }
        if (!bodyReq.jobTitle) {
            apiRes.message = apiResponseMessage("114", "Job Title");
            return res.status(400).send({ apiRes });
        }

        let fieldsToUpdate = ``;
        if (firstName) fieldsToUpdate += `firstName = '${firstName}', `;
        if (lastName) fieldsToUpdate += `lastName = '${lastName}', `;
        if (mobile) fieldsToUpdate += `mobile = '${mobile}', `;
        if (jobTitle) fieldsToUpdate += `jobTitle = '${jobTitle}', `;
        if (jobTitle) fieldsToUpdate += `extension = '${extension}' `;

        let whereQuery = ` employeeNumber = ${bodyReq.empCode}`;

        const updateUser = await saveUpdate(
            (tableName = "employees"),
            fieldsToUpdate,
            whereQuery
        );

        if (updateUser) {
            apiRes.status = "sucess";
            apiRes.message = apiResponseMessage("116");
            apiRes.code = 200;
            return res.status(200).json({ apiRes });
        }
        apiRes.message = apiResponseMessage("107");
        return res.status(500).send({ apiRes });
    } catch (error) {

         console.log(error.message);

        apiRes.message = apiResponseMessage("ERR");
        return res.status(500).send({ apiRes });
    }
};

module.exports = updateDetails;
