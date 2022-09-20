// get post and delete orders only loged in user can do
const router = require("express").Router();
const orders = require("../models/orderModel");

router.get("/orders", async (req, res) => {
  const allOrders = await orders.find({ user: req.user });
  res.status(200).json({
    allOrders
  })
});