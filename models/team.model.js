const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        ownerId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            maxlength: 250,
        },
        damages: {
            type: String,
            maxlength: 250,
        },
        onLvl: {
            type: String,
            maxlength: 250,
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("team", teamSchema);