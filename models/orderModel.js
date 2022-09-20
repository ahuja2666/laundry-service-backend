// order schema

const mongoose = require("mongoose");

const orderDetails = new mongoose.Schema({
  orderid: { type: String, required: true },
  totalItem : Number,
  orderDate : String,
  totalPrice: Number,
  status : String,
  user: { type: Schema.Types.ObjectId, ref: "UserData" },
  Shirts: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Tshirts: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Trousers: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Jeans: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Boxers: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Joggers: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  Others: {
    quantity: { type: Number, default: 0 },
    washingmachine: { type: Boolean, default: false },
    ironing: { type: Boolean, default: false },
    towel: { type: Boolean, default: false },
    bleach: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  StoreInformation : {
    storeLocation : String,
    storeAddress: String,
    phone : Number
  },
  UserAddress: {
    title : String,
    district: String,
    address: String
  }

});

const orders = mongoose.model('orders',orderDetails);

module.exports = orders;