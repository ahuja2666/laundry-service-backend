// user schema
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const JWTPRIVATEKEY ="tsawant635";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});


// jwt token

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const UserData = new mongoose.model("LaundryUsers", UserSchema);


// validate part

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        phone: Joi.number().required().label("Phone"),
        state: Joi.string().required().label("State"),
        district: Joi.string().required().label("District"),
        address: Joi.string().required().label("Address"),
        pincode: Joi.number().required().label("Pincode"),
	});
	return schema.validate(data);
};

module.exports = { UserData, validate };

