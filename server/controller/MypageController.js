const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");
const getNextDate = require("../util");

const getMypage = async (req, res) => {
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port : 3307,
        database: "joinCrew",
        dateStrings: true,
    });
  let authorization = ensureAuthorization(req, res);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else {
    let { current_date } = req.query;
    let nextDay = getNextDate(current_date);
    console.log(nextDay);
    let query = `SELECT *, 
                    (SELECT COUNT(*) FROM eventMember WHERE event_id = events.id) AS now_members 
                    FROM events LEFT JOIN eventMember ON events.id = eventMember.event_id 
                    WHERE user_id = ? AND event_date >= ? AND event_date < ?;`;
    let value = [authorization.id, current_date, nextDay];
    let [rows, field] = await conn.query(query, value);
    if (rows.length == 0) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json(rows);
  }
};

module.exports = getMypage;
