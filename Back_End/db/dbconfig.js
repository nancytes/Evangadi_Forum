const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

module.exports = dbconnection.promise();
