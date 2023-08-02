

const mysql = require('mysql');
const db_congig = {
  host: 'localhost',
  user: 'root',
  passowrd: '',
  database: 'test'
};

const mysqlDbConn = mysql.createConnection(db_congig);

module.exports = mysqlDbConn;
