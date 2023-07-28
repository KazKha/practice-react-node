const http      = require('http');



// http.createServer(function (request, response) {
//     // Send the HTTP header 
//     // HTTP Status: 200 : OK
//     // Content Type: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
    
//     // Send the response body as "Hello World"
//     response.end('Hello World\n');
//  }).listen(8081);


const mysql     = require('mysql');
const db_congig = require('./utils/mysql_config')

const mysqlDbConn = mysql.createConnection( db_congig );

let EmpQuery = 'SELECT * FROM `orders` where customerNumber = ? ';
let EmpQueryParam =[ 119 ];

mysqlDbConn.query(EmpQuery, EmpQueryParam, (err, returnData , fields) => {
    if(err) console.log( ' eeror in query -> '+ err.message)
    

    console.log(returnData)
    console.log(returnData.length)

});

mysqlDbConn.end();
