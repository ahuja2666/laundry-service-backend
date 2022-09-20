// get post and delete orders only loged in user can do

const express = require('express');
const router = express.Router();
const orders = require('../models/orderModel')

router.get('/',async(req,res)=>{
    try {
        const data = await orders.find();
    res.status(200).json({
        status : "success",
        posts : data
    })
    } catch (error) {
        res.status(500).json({
            status : "failure",
            message: error.message
        })
    }
    
})

router.post('/',async(req,res)=>{
    try {

        
        const data = await orders.create({
            totalItem : req.body.totalItem,
            orderDate : req.body.orderDate,
            totalPrice: req.body.totalPrice,
            status : req.body.status,
            StoreInformation : {
              storeLocation : req.body.storeLocation,
              storeAddress: req.body.storeAddress,
              phone : req.body.phone
            },
            UserAddress: {
              title : req.body.title,
              district: req.body.district,
              address: req.body.address
            },
            Shirts: {
              quantity:  req.body.quantity,
              washingmachine:  req.body.washingmachine,
              ironing:  req.body.ironing,
              towel:  req.body.towel,
              bleach:  req.body.bleach,
              price:  req.body.price
            }
        })
    res.status(200).json({
        status : "success",
        posts : data
    })
    } catch (error) {
        res.status(500).json({
            status : "failure",
            message: error.message
        })
    }
})
module.exports = router;