const mysql = require("mysql2");

// DB와 연결 통로 생성
const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  port : 3306,
  database: "",   
  dateStrings: true,
});

module.exports = connection;
