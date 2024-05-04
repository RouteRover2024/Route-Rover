const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		googleId: String,
		displayName: String,
		image: String,
		email: String,
		history : [{
			type: mongoose.Schema.Types.ObjectId,
      		ref: 'history',
		}]
	},
	{ timestamps: true }
);

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
