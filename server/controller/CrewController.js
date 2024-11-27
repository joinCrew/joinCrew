const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes');
const ensureAuthorization = require('../auth');
const getNextDate = require('../util');
const sender = process.env.SENDER;
const {transporter} = require('../email');
const { defaultMaxListeners } = require('nodemailer/lib/xoauth2');

const joinIn = async (req, res)=>{
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port : 3307,
        database: "joincrew",
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
        const {id} = req.params;
        let event_id = id;
        const {is_full, title} = req.body;
        console.log(event_id, authorization.id);
        let query = "INSERT INTO eventMember (event_id, user_id) VALUES(?, ?)";
        let values = [event_id, authorization.id];
        let [rows] = await conn.execute(query, values);
        if(is_full == true){
            query = "SELECT email FROM users LEFT JOIN eventMember ON eventMember.user_id = users.id WHERE event_id = ?"
            let values = [event_id];
            let [results] = await conn.execute(query, values);
            for(let i = 0; i < Object.keys(results).length; i++){
                const mailOptions = {
                    from : sender,
                    to: results[i].email,
                    subject: `${title} 모임 인원 구성이 완료 됐습니다!`,
                    text: `팀원들과 함께 소통해 보세요!`
                    };
                    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Email Sented to ' + e);
                    }
                    })      
            }
            return res.status(StatusCodes.CREATED).json(rows);
        }
        return res.status(StatusCodes.CREATED).json(rows);


      }

}


const detach = async (req,res)=>{

    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port : 3307,
      database: "joincrew",
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
        const {id} = req.params;
        let event_id = id;
        event_id = parseInt(event_id);
        const user_id = authorization.id;
        let query = `DELETE FROM eventMember WHERE user_id = ? AND event_id = ?`
        let values =[user_id, event_id];
        console.log(values);
        let [rows] = await conn.execute(query, values);

        return res.status(StatusCodes.OK).json(rows);

      }

}

module.exports ={joinIn, detach};


