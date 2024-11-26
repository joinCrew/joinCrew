const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const ensureAuthorization = (req, res) => {
  try {
    let receivedJwt = req.headers["authorization"];
    console.log("received jwt : ", receivedJwt);

    if (receivedJwt) {
      // Bearer 접두어 제거
      const token = receivedJwt.split(" ")[1];

      if (!token) {
        throw new ReferenceError("JWT must be provided");
      }

      let decodedJwt = jwt.verify(token, process.env.PRIVATE_KEY);
      console.log(decodedJwt.id);
      return decodedJwt;
    } else {
      throw new ReferenceError("JWT must be provided");
    }
  } catch (err) {
    console.log(err);
    console.log(-1);
    console.log(err.name);
    console.log(err.message);

    return err;
  }
};

module.exports = ensureAuthorization;
