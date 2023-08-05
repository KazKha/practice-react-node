const { connection } = require("../utils/mysql_config");
//const { connection } = require("../utils/mysql_poolconn");

//const mysqlDbConn = mysql.createConnection( db_congig );

const authenticateUser = (param) => {
  try {
    const authQuery = `SELECT * FROM employees WHERE email = ? and employeeNumber = ?`;

    const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

    connection.query(authQuery, EmpQueryParam, (err, returnData, fields) => {
      if (err) console.log(" error in query -> " + err.message);
      console.log(returnData.length );
      if (returnData.length == 1 && Array.isArray(returnData)) {
        
        console.log(returnData );
        let resposneData =[]; 
        let val =  Object.values( JSON.parse(JSON.stringify(returnData)) );
        for ( let index = 0 ; index < val.length ; index++ )  {
          resposneData.push( val[index] );
        }
        return resposneData ;
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
