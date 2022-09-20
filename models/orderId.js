const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderIdScheme = new Schema({
  orderid: Number
})

const orderIdModel = mongoose.model("orderids", orderIdScheme);

module.exports = orderIdModel;