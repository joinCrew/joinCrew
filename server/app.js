const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"], 
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Set-Cookie, set-cookie"
    );
    next();
});

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening on ${process.env.PORT}`);
})

const userRouter = require("./routes/users");
const evenRouter = require("./routes/events")
app.use("/users", userRouter);
app.use('/events', evenRouter);