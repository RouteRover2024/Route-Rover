const mongoose = require("mongoose");

const history = new mongoose.Schema(
	{
		source : String,
        destination : String,
        duration : String,
        distance : String,
        cost : Number
	},
	{ timestamps: true }
);

const historydb = new mongoose.model("history", history);

module.exports = historydb;
