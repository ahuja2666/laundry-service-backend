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

		
		const username=user.name     // use for to show name in order page
		const useraddress=user.address

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" })
         
		const token = user.generateAuthToken();
    
		res.status(200).send({ data: [username,token,useraddress] , message: "logged in successfully" });    // send to fe
       
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// const validate = (data) => {
// 	const schema = Joi.object({
// 		email: Joi.string().email().required().label("Email"),
// 		password: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

module.exports = router;
