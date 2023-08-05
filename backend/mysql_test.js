const { login } = require("./Controllers/authController");
const connections  = require("./utils/mysql_poolconn");

// const mysqlDbConn = mysql.createConnection( db_config );

let query = 'SELECT * FROM `orders` where customerNumber = 119 ';
let EmpQueryParam =[ 119 ];

connections.getConnection(function(err,connection){
    if (err) {
      connection.end();
      throw err;
    }   
    connection.query(query,function(err,rows){
        connection.end();
        
        console.log(rows);
    });
    connection.on('error', function(err) {      
         console.log( err );     
    });
});

connections.end();