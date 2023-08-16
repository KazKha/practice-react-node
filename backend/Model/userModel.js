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
        let resposneData =[];
       
        resolve(returnData[0]);
        if (returnData.length == 1 && Array.isArray(returnData)) {
          let val = Object.values(JSON.parse(JSON.stringify(returnData)));
          for (let index = 0; index < val.length; index++) {
            resposneData.push(val[index]);
          }
        }
        resposneData.length > 0 ?  resolve(resposneData[0]) : reject(false);
       
      }
    });
  });

  // console.log(param.email);

  // let authQuery = `SELECT * FROM employees WHERE email =? and employeeNumber = ?`;
  // //let authQuery = `SELECT * FROM employees WHERE email = ${param.email} and employeeNumber = ${param.empCode}`;

  // const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

  // try {
  //   connection.query(authQuery, EmpQueryParam, (err, returnData, fields) => {
  //     if (err) console.log(" error in query -> " + err.message);
  //     console.log("--->?");
  //     console.log(returnData.length);
  //     if (returnData.length == 1 && Array.isArray(returnData)) {
  //       // console.log(returnData);
  //       let resposneData = [];
  //       let val = Object.values(JSON.parse(JSON.stringify(returnData)));

  //       // console.log(val);
  //       for (let index = 0; index < val.length; index++) {
  //         resposneData.push(val[index]);
  //       }
  //       console.log(resposneData);
  //       return resposneData;
  //     }

  //     return false;
  //   });
  // } catch (error) {
  //   console.error("Error executing query:", error);
  //   return null;
  //   connection.end();
  // }
};

module.exports = authenticateUser;
