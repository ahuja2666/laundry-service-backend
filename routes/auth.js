const router = require("express").Router();
const { UserData } = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });
        
	    //
        const {emailphone,password} = req.body;
		   
		if(isNaN(parseFloat(emailphone))){
			
			var user = await UserData.findOne({ email: emailphone });
		if (!user)
			return res.status(401).send({ message: "Invalid Email " });
		}
		else{
			
			var  user = await UserData.findOne({ phone: emailphone });
		if (!user)
			return res.status(401).send({ message: "Invalid Phone" });
		}

		
		const username=user.name

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });

         
		const token = user.generateAuthToken();
       
		res.status(200).send({ data: [username,token] , message: "logged in successfully" });
       
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;
