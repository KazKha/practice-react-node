const { connection } = require("../utils/mysql_config");
const resposneData = {};

//const mysqlDbConn = mysql.createConnection( db_congig );

const authenticateUser = async (param) => {
  try {
    
    const authQuery = `SELECT * FROM employees WHERE email = ? and employeeNumber = ?`;

    const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

    connection.query(authQuery, EmpQueryParam, (err, returnData, fields) => {
      
      if (err) console.log(" error in query -> " + err.message);
       console.log(returnData.length );
      if (returnData.length == 1) {
          const resposneData =   JSON.stringify(returnData);
           
          return '[{"employeeNumber":1002,"lastName":"Murphy","firstName":"Diane","extension":"x5800","email":"kazkha@gmail.com","officeCode":"1","reportsTo":null,"jobTitle":"President"}]';
      }
      return false;
      
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
    connection.end();
  }
};

module.exports = authenticateUser;
