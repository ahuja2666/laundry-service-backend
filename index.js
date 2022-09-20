
const mongoose = require("mongoose")
const express = require('express')
const orderRoutes = require('./routes/ordersRoute')


require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;


// middlewares
app.use(express.json());
app.use(cors());


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
