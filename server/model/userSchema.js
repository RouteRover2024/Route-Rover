const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		googleId: String,
		displayName: String,
		image: String,
		email: String,
		history : [{
			indx : Number,
			source : String,
			destination : String,
			duration : String,
			distance : String,
			cost : Number
		}]
	},
	{ timestamps: true }
);

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
