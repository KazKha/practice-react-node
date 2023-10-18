

const validateEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(value);
};

const ValidateEmpCode = (value) => {
  const numberPattern = /^\d{4}$/;
  return numberPattern.test(value);
};

const validateNumber = (value) => {
  const numberPattern = /^[0-9]+$/;
  return numberPattern.test(value);
};

const OnlyChar = (value) => {
    const OnlyCharater = /^[a-zA-Z ]+$/;
    return OnlyCharater.test(value);
};

const apiResponseMessage = (resMsg, fieldName) => {
  const messege = {
    101: "Invalid Email Id",
    102: "Email-id Already Exist",
    103: "Username is Required",
    104: "Only Number are Allowed",
    105: "Only Charater are Allowed",
    106: "Password is Required",
    107: "Invalid Credentials",
    108: "Successfully Login",
    109: "Successfully Logout",
    110: "Invalidd Phone Number",
    111: "Phone Number is Required",
    112: "Invalid Emp Code Or Worng  Code Enter ",
    113: "Invalid Token entered",
    114: `${fieldName} is mandatery`,
    115: `Entered Email-ID Or Mobiles Already exist`,
    116: `Details are updated`,

    ERR: "Something Went Wrong",
    DNF: "Data Not Found",
    AUTH: "Invalld Authorization",
    F: "Failed",
    S: "Success",
  };
  return messege[resMsg];
};

export  {
  validateEmail,
  apiResponseMessage,
  ValidateEmpCode,
  validateNumber,
  OnlyChar
};
