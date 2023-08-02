 const db = require('../utils/mysql_config');


  const authenticateUser = async (...param) => {

    const authQuery = await db.query('SELECT * FROM users WHERE email = ? and Passw', [email]);

    mysqlDbConn.query(EmpQuery, EmpQueryParam, (err, returnData , fields) => {

        console.log(returnData)
        console.log(returnData.length)
    
    });
  }