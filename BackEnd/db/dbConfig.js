require("dotenv").config();
const mysql = require('mysql')

const isProduction = process.env.NODE_ENV === "production";

var masterPool = mysql.createPool({
  connectionLimit : 10,
  port     :  process.env.DB_PORT,
  host     :  process.env.DB_HOST,
  user     :  process.env.DB_USER,
  password :  process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE1
});
var spmsPool = mysql.createPool({
  connectionLimit : 10,
  port     :  process.env.DB_PORT,
  host     :  process.env.DB_HOST,
  user     :  process.env.DB_USER,
  password :  process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE2
});

module.exports={masterPool,spmsPool}   