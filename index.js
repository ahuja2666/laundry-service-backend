const mongoose = require("mongoose")
const express = require('express')
const orderRoutes = require('./routes/ordersRoute')
const jwt = require('jsonwebtoken');
const {UserData} = require('./models/userModel')


require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const JWTPRIVATEKEY ="tsawant635";

// middlewares
app.use(express.json());
app.use(cors());
app.use("/orders", async(req,res,next)=>{
  if(req.headers.authorization){
      const token = req.headers.authorization;
      jwt.verify(token, JWTPRIVATEKEY,async(err,decoded)=>{
          if(err){
              res.status(500).json({
                  status:"failed",
                  message:"User not authenticated"
              })
          }
          // console.log(decoded._id);
          const user = await UserData.findOne({_id: decoded._id})
          req.user = user._id;
          next();
      })
  }   
  else{
      return res.status(500).json({
          status : "failed",
          message : "Invalid token"
      })
  }
})


// connect with db
mongoose.connect("mongodb+srv://tsawant635:tsawant635@cluster0.r6b5bha.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/orders',orderRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
