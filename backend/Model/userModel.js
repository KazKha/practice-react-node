const { connection, connectionConfig } = require("../utils/mysql_config");
//const { connection } = require("../utils/mysql_poolconn");

//const mysqlDbConn = mysql.createConnection( connectionConfig );

const authenticateUser = (param) => {
  return new Promise((resolve, reject) => {
    let authQuery = `SELECT employeeNumber, firstName, lastName,email FROM employees WHERE email =? and employeeNumber = ?`;
    const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam
    connection.query(authQuery, EmpQueryParam, (error, returnData, fields) => {
      if (error) {
        reject(error);
      } else {
        let resposneData = [];

        resolve(returnData[0]);
        if (returnData.length == 1 && Array.isArray(returnData)) {
          let val = Object.values(JSON.parse(JSON.stringify(returnData)));
          for (let index = 0; index < val.length; index++) {
            resposneData.push(val[index]);
          }
        }
        resposneData.length > 0 ? resolve(resposneData[0]) : reject(false);
      }
    });
  });
};

const getDetails = (param) => {
  return new Promise((resolve, reject) => {
    let authQuery = `SELECT * FROM employees WHERE employeeNumber = ?`;
    const EmpQueryParam = [param.empCode]; //EmpQueryParam
    connection.query(authQuery, EmpQueryParam, (error, returnData, fields) => {
      if (error) {
        reject(error);
      } else {
        let resposneData = [];

        resolve(returnData[0]);
        if (returnData.length == 1 && Array.isArray(returnData)) {
          let val = Object.values(JSON.parse(JSON.stringify(returnData)));
          for (let index = 0; index < val.length; index++) {
            resposneData.push(val[index]);
          }
        }
        resposneData.length > 0 ? resolve(resposneData[0]) : reject(false);
      }
    });
  });
};

const checkAlreadyExist = (tables, fieldsName, condition) => {
  return new Promise((resolve, reject) => {
    var authQuery = `SELECT ${feildsName} FROM ${tables} `;
    if (condition) {
      authQuery += `WHERE ${condition}`;
    }

    connection.query(authQuery, (error, returnData, fields) => {
      returnData.length > 1  ? resolve(true) : resolve(false) ;
    });
  });
};

const saveUpdate = ( tableName, fieldsToUpdate, whereQuery ) => {

      

  return new Promise((resolve, reject) => {

    let authQuery = ` Update  ${tableName} Set ${fieldsToUpdate} where ${ whereQuery } ` ;
    
    //const EmpQueryParam = [param.empCode]; //EmpQueryParam
    connection.query(authQuery,  (error, returnData, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(returnData.affectedRows );
      }
    });
  });
};

module.exports = {
  authenticateUser,
  getDetails,
  saveUpdate,
  checkAlreadyExist,
};
