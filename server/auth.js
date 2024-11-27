const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ensureAuthorization = (req, res) => {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log("received jwt : ", receivedJwt);

        if (receivedJwt) {
             // Bearer 토큰에서 실제 JWT 추출
            const token = receivedJwt.split(' ')[1];
            let decodedJwt = jwt.verify(token, process.env.PRIVATE_KEY);
            console.log(decodedJwt);
            return decodedJwt;
        } else {
            throw new ReferenceError("jwt must be provided");
        }
    } catch (err) {
        console.log(-1);
        console.log(err.name);
        console.log(err.message);

        return err;
    }    
}

module.exports = ensureAuthorization;