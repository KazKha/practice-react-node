const mysql = require("mysql");
require('dotenv').config();


const db_config = {
  host: process.env.DB_HOST,
  post: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

 const param = { empCode: '1002', email: 'kazkha@gmail.com' };

console.log(db_config);
const mysqlDbConn = mysql.createConnection(db_config);

//let EmpQuery = "SELECT * FROM `orders` where customerNumber = 119 ";
//let EmpQuery = `SELECT * FROM employees WHERE email = ${param.email} and employeeNumber = ${param.empCode}`;
let EmpQuery = `SELECT * FROM employees WHERE email = ? and employeeNumber = ?`;
//let EmpQueryParam = [119];
const EmpQueryParam = [param.email, param.empCode]; //EmpQueryParam

mysqlDbConn.query(EmpQuery, EmpQueryParam, (err, returnData, fields) => {
  if (err) console.log(" eeror in query -> " + err);


  
   

  console.log(returnData)
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
