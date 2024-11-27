const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");
const getNextDate = require("../util");
const sender = process.env.SENDER;
const { transporter } = require("../email");

const getEvents = async (req, res) => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "joinCrew",
    dateStrings: true,
  });
  let { current_date } = req.query;
  let nextDay = getNextDate(current_date);
  console.log(nextDay);
  let query = `SELECT *, 
                (SELECT COUNT(*) FROM eventMember WHERE event_id = events.id) AS now_members 
                 FROM events WHERE event_date >= ? AND event_date < ?;`;
  let value = [current_date, nextDay];
  let [rows, field] = await conn.query(query, value);
  if (rows.length == 0) return res.status(StatusCodes.NOT_FOUND).end();
  return res.status(StatusCodes.OK).json(rows);
};

const getDetail = async (req, res) => {
  const id = req.params.id;
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "joinCrew",
    dateStrings: true,
  });
  let query = `SELECT *,
    (SELECT COUNT(*) FROM eventMember WHERE event_id = events.id) AS now_members
     FROM events WHERE id = ?;`;
  let value = [id];
  let [rows, field] = await conn.query(query, value);

  const event = rows[0];

  // leader_id = 로그인 id 비교
  let isLeader = false;
  let authorization;

  try {
    authorization = ensureAuthorization(req, res);

    if (!(authorization instanceof Error)) {
      isLeader = authorization.id === event.leader_id;
    }
  } catch (err) {
    console.log("getDetail Error", err);
  }

  let result = {
    ...event,
    isLeader,
  };

  console.log(result);
  return res.status(StatusCodes.OK).json(result);
};

const registerEvent = async (req, res) => {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
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
    const { title, descript, max_members, gender, location, ages, event_date } =
      req.body;
    let query = `INSERT INTO events (leader_id, title, descript, max_members, gender, location, ages, event_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;
    let values = [
      authorization.id,
      title,
      descript,
      max_members,
      gender,
      location,
      ages,
      event_date,
    ];
    let [results] = await conn.execute(query, values);
    let event_id = results.insertId;

    query = `INSERT INTO eventMember (event_id, user_id) VALUES (?, ?);`;
    values = [event_id, authorization.id];
    console.log(event_id);
    let [rows, field] = await conn.query(query, values);
    return res.status(StatusCodes.CREATED).json(rows);
  }
};

const removeEvent = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const conn = await mysql.createConnection({
    //비동기 처리
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
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
    // 1. 해당 이벤트에 참가한 모든 사람들 선택
    let query =
      "SELECT DISTINCT email FROM users LEFT JOIN eventMember ON users.id = eventMember.user_id  WHERE eventMember.event_id = ?;";
    let [results] = await conn.execute(query, [id]);

    // 2. eventMember 테이블에서 해당 이벤트의 참가자 삭제
    query = "DELETE FROM eventMember WHERE event_id = ?";
    await conn.execute(query, [id]);

    // 3. events 테이블에서 해당 이벤트 삭제
    query = `DELETE FROM events WHERE id = ?`;
    let [rows, field] = await conn.query(query, [id]);

    // 4. 참가자들에게 이메일 알림 전송
    for (let i = 0; i < results.length; i++) {
      const mailOptions = {
        from: sender,
        to: results[i].email,
        subject: `모임이 취소 됐습니다`,
        text: `모임리더가 "${title}" 모임을 취소했습니다.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email Sent to " + results[i].email);
        }
      });
    }

    return res.status(StatusCodes.OK).json(rows);
  }
};

module.exports = {
  registerEvent,
  removeEvent,
  getEvents,
  getDetail,
};
