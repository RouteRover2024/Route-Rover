const mongoose = require("mongoose");

const history = new mongoose.Schema(
    {
        src:{
            type: String,
            required: true
        },
        dest:{
            type: String,
            required: true
        },
        time:{
            type: Date,
            default: Date.now
        }
    },
);

const historydb = new mongoose.model("history", history);

module.exports = historydb;
