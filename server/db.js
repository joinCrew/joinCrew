const mysql = require("mysql2");

// DB와 연결 통로 생성
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port : 3307,
  database: "joincrew",   
  dateStrings: true,
});

module.exports = connection;
