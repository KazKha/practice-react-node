const mysql     = require('mysql');
const db_config1 = require('./utils/mysql_config');
console.log(db_config1[0]);

const db_config = {
    host: 'localhost',
    user: 'root',
    passowrd: '',
    database: 'test'
  };


    console.log(db_config);
const mysqlDbConn = mysql.createConnection( db_config );

let EmpQuery = 'SELECT * FROM `orders` where customerNumber = 119 ';
let EmpQueryParam =[ 119 ];

mysqlDbConn.query(EmpQuery, (err, returnData , fields) => {
    if(err) console.log( ' eeror in query -> '+ err)
    

    //console.log(returnData)


});

mysqlDbConn.end();




































// const http      = require('http');

// const mysql     = require('mysql');
// const { db_config } = require('./utils/mysql_config')

// const mysqlDbConn = mysql.createConnection( db_config ); 
// const mysqlDbConnect = mysqlDbConn.connect(); 

// let EmpQueryParam =`kazkha@gmail.com` ;
// let EmpQuery = `SELECT * FROM employees where email = ${EmpQueryParam} `;

// mysqlDbConnect.query(EmpQuery, (err, returnData , fields) => {
//     if(err) console.log( ' eeror in query -> '+ err.message)
    

//     console.log(returnData)
//     console.log(returnData.length)

// });

// mysqlDbConnect.end();
