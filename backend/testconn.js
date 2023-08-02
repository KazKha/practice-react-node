const http      = require('http');






const mysql     = require('mysql');
const {db_congig , mysqlDbConn} = require('./utils/mysql_config')

//const mysqlDbConn = mysql.createConnection( db_congig );

let EmpQueryParam =`kazkha@gmail.com` ;
let EmpQuery = `SELECT * FROM employees where email = ${EmpQueryParam} `;

mysqlDbConn.query(EmpQuery, (err, returnData , fields) => {
    if(err) console.log( ' eeror in query -> '+ err.message)
    

    console.log(returnData)
    console.log(returnData.length)

});

mysqlDbConn.end();
