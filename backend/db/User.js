const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	birthday: { type: String, required: true },
	password: { type: String, required: true },
	avatarUrl: { type: String, default: "" },
});

const validateSchema = (request) => {
	if (!request.firstName) {
    console.log("fn")
		return false;
	}
	if (!request.lastName) {
		return false;
	}
	if (!request.email) {
		return false;
	}
	if (!request.birthday) {
		return false;
	}
	if (!request.password) {
		return false;
	}
	if (!request.repeatPassword) {
		return false;
	}

	return true;
};

module.exports = {
	db: mongoose.model("users", userSchema),
	validateSchema: validateSchema,
};
