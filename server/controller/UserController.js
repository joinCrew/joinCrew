const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const conn = require('../db')

const join = (req,res)=>{
    const {email, password} = req.body;

    let query = "INSERT INTO users (email, password) VALUES (?, ?)";
    const values = [email, password];
    conn.query(query, values, (err, rows)=>{
        if (err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if(rows.affectedRows)
            return res.status(StatusCodes.CREATED).json(rows);
        else
            return res.status(StatusCodes.BAD_REQUEST).end()
    })
}

const login = (req, res)=>{
    const {email, password} = req.body;
    let query = `SELECT * FROM users WHERE email = ?  and password = ?`;
    let values = [email, password];
    let user;
    conn.query(query,  values, (err, rows)=>{
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        user = rows[0];
        if(user){
            const token = jwt.sign(
            {   id : user.id,
                email : user.email
            },
            process.env.PRIVATE_KEY,
            {
                expiresIn : "100m",
                issuer : "andev",
            }
            )
            res.cookie("Authorization" , token, {
                httpOnly : true,
            });
            console.log(token);

            return res.status(StatusCodes.OK).json({user, token : token});
        }
        else{
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }

    })

}

module.exports = {
    login,
    join,
}
