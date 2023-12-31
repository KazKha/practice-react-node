const { connection, connectionConfig } = require("../utils/mysql_config");
const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const onlyChar = /^(\s{0,1}[A-Za-z])+$/;
const onlyNum = /^\d{10}$/;

const ValidateEmail = (email) => {
  if (!email || !emailRegex.test(email)) return false;
};



const ValidateEmpCode = (empCode) => {
  if (!empCode || !/^\d{4}$/.test(empCode)) return false;
};

const ValidateMobiles = (Mobile) => {
  if (!onlyNum.test(Mobile)) return false;
};

const ValidateName = (Name) => {
  if (!onlyChar.test(Name)) return false;
};


const apiResponseMessage = (resMsg, fieldName) => {
  const messege = {
    '101': "Invalid Email Id",
    '102': "Email-id Already Exist",
    '103': "Username is Required",
    '104': "Only Number are Allowed",
    '105': "Only Charater are Allowed",
    '106': "Password is Required",
    '107': "Invalid Credentials",
    '108': "Successfully Login",
    '109': "Successfully Logout",
    '110': "Invalidd Phone Number",
    '111': "Phone Number is Required",
    '112': "Invalid Emp Code Or Worng  Code Enter ",
    '113': "Invalid Token entered",
    '114': `${fieldName} is mandatery`,
    '115': `Entered Email-ID Or Mobiles Already exist`,
    '116': `Details are updated`,
    
    
    'ERR': "Something Went Wrong",
    'DNF': "Data Not Found",
    'AUTH': "Invalld Authorization",
    'F': "Failed",
    'S': "Success",
    
  };
  return messege[resMsg];
};

module.exports = {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidateEmpCode,
  ValidateMobiles,
  
};
