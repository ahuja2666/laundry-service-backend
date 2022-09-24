const mongoose = require("mongoose");
const orderDetails = new mongoose.Schema({
  orderid: { type: String, required: true },
  totalItems: Number,
  orderDate: String,
  totalPrice: Number,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LaundryUsers",
    required: true,
  },
  StoreInformation: {
    storeLocation: String,
    storeAddress: String,
    phone: Number
  },
  Orders: [
    {
      name: { type: String},
      subprice: { type: Number},
      quantity: { type: Number},
      price: { type: Number},
      washprice: { type: Number},
      washes: [
        {
          name: {type: String},
          price: {type: Number},
          imgNormal: {type: String},
          imgBlue: {type: String},
          id: {type: Number}
        },
      ],
    },
  ],
});

const orders = mongoose.model("orders", orderDetails);

module.exports = orders;













