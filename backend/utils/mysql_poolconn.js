const { createPool } = require('mysql');
 require('dotenv').config();

const connection =  createPool({
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})





module.exports = connection;