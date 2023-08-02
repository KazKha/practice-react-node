const http      = require('http');






const mysql     = require('mysql');
const db_congig = require('./utils/mysql_config')

const mysqlDbConn = mysql.createConnection( db_congig );

let EmpQuery = 'SELECT * FROM `orders` where customerNumber = ? ';
let EmpQueryParam = [ 119 ];

mysqlDbConn.query(EmpQuery, EmpQueryParam, (err, returnData , fields) => {
    if(err) console.log( ' eeror in query -> '+ err.message)
    

    console.log(returnData)
    console.log(returnData.length)

});

mysqlDbConn.end();
