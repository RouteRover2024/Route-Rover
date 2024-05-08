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

        fare:{
            type: String,
        },
        
        distance:{
            type: String,
            required: true
        },
        
        duration:{
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
