const mongoose = require('mongoose');

const raidSchema = new mongoose.Schema(
    {
        raidName: {
            type: String,
            maxlength: 250,
        },
        saison: {
            type: String,
            maxlength: 250,
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("raid", raidSchema);