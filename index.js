
const mongoose = require("mongoose")
const express = require('express')
const orderRoutes = require('./routes/ordersRoute')
const JWTPRIVATEKEY = "tsawant635";
const jwt = require("jsonwebtoken");

require("dotenv").config();
const orders = require("./models/orderModel");
const UserData = require("./models/userModel");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;


// middlewares
app.use(express.json());
app.use(cors());


// connect with db
mongoose.connect("mongodb+srv://tsawant635:tsawant635@cluster0.r6b5bha.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const ordersRoutes = require("./routes/ordersRoute");


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/orders", ordersRoutes);

//getting token of a user
app.use("/orders", async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, JWTPRIVATEKEY, async function (err, decode) {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          message: "User not Valid"
        });
      }
      console.log(token);
      const user = await UserData.findOne({ _id: decode.data });
      if (user) {
        req.user = user._id
        next();
      } else {
        return res.status(400).json({
          status: "Failed",
          message: "User not found"
        });
      }
    });

  } else {
    return res.status(400).json({
      status: "Failed",
      message: "User not Authenticated"
    });
  }
});

app.use('/orders', orderRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
