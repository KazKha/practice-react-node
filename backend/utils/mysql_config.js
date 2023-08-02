

const mysql = require('mysql');
const db_congig = {
  host: 'localhost',
  user: 'root',
  passowrd: '',
  database: 'test'
};

const connectMysql = mysql.createConnection(db_congig);
const mysqlDbConn = connectMysql.connect( (err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
})


module.exports = {
  mysqlDbConn,
  db_congig

}
