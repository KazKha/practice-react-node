const  {connection}  = require("../utils/mysql_config");
const returnResposne ={};
//const mysqlDbConn = mysql.createConnection( db_congig );


const authenticateUser = async (param) => {
  try {
    const authQuery = `SELECT * FROM employees WHERE email = ? and employeeNumber = ?`;

    const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

    connection.query(
      authQuery,
      EmpQueryParam,
      (err, returnData, fields) => {
        if (err) console.log(" error in query -> " + err.message);

         return "kazim";
        if(returnData.length == 1) return JSON.stringify(returnData);
        
        return false;   
    }); 
    
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
    connection.end();
  }
};



module.exports = authenticateUser

