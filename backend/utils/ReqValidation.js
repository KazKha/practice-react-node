const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const onlyChar = /^(\s{0,1}[A-Za-z])+$/;
const onlyNum = /^\d{10}$/;

const ValidateEmail = (email) => {
  if (!email || !emailRegex.test(email)) return false;
};

const ValidatePassword = (password) => {};

const ValidateMobiles = (Mobile) => {
  if (!onlyNum.test(Mobile)) return false;
};

const ValidateName = (Name) => {
  if (!onlyChar.test(Name)) return false;
};

const apiResponseMessage = (resMsg) => {
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
    '110': "Invalid Phone Number",
    '111': "Phone Number is Required",
  };
  return messege[resMsg];
};

module.exports = {
  ValidateEmail,
  ValidateName,
  apiResponseMessage,
  ValidatePassword,
  ValidateMobiles,
};