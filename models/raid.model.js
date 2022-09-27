const mongoose = require('mongoose');

const raidSchema = new mongoose.Schema(
    {
        raidName: {
            type: String,
            maxlength: 250,
        },
        raidSaison: {
            type: String,
            maxlength: 250,
            unique: true
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("raid", raidSchema);