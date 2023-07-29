const emailRegex =/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const onlyChar = /^(\s{0,1}[A-Za-z])+$/;
const onlyNum  = /^\d{10}$/;
const response =  {
    res_code , 
    res_msg , 
} 
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
const GenrateResposne = (  ) => {

  if (!onlyChar.test(Name)) return false;
};

module.exports = {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
  GenrateResposne,
  ValidateMobiles
};
