const router = require("express").Router();
const { UserData, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");
const SALT=10

router.post("/", async (req, res) => {
	try {

		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await UserData.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new UserData({ ...req.body, password: hashPassword }).save();
        
		res.status(201).send({  message: "User created successfully" });
	} catch (error) {
		res.status(500).send(error,{ message: "Internal Server Error" });
	}
});

module.exports = router;