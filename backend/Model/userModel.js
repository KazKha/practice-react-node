const { mysqlDbConn } = require("../utils/mysql_config");
//const mysqlDbConn = mysql.createConnection( db_congig );

const authenticateUser = async (param) => {
  try {
    const authQuery = `SELECT * FROM employees`;
    //WHERE email = ? and employeeNumber = ?

    const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

    mysqlDbConn.query(
      `SELECT * FROM employees`,
      [param.email, param.empCode],
      (err, returnData, fields) => {
        if (err) console.log(" error in query -> " + err.message);

        console.log(returnData);
        console.log(returnData.length);
      }
    );
  } catch (error) {
    console.error("Error executing query:", error);
    return null;
    mysqlDbConn.end();
  }
};

authenticateUser({ empCode: "1002", email: "kazkha@gmail.com" });

module.exports = {
  authenticateUser,
};
