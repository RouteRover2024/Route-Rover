const mongoose = require("mongoose");

const history = new mongoose.Schema({
	src: {
		type: String,
		required: true,
	},
	dest: {
		type: String,
		required: true,
	},

	fare: {
		type: String,
		default: "",
	},

	distance: {
		type: String,
		default: "",
	},

	duration: {
		type: String,
		default: "",
	},

	time: {
		type: Date,
		default: Date.now,
	},
});

const historydb = new mongoose.model("history", history);

module.exports = historydb;
