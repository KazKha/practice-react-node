const mysql = require('mysql');
// MySQL database configuration
const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a MySQL connection
const connection = mysql.createConnection(connectionConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

async function query(sql, params) {
  
  const [results, ] = await connection.execute(sql, params);

  return results;
}


// Export the connection for usage in other files

module.exports = {
  connection,
  query
}
