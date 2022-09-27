const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema(
    {
        raidId: {
            type: String,
            required: true
        },
        bossName: {
            type: String,
            maxlength: 250,
            required: true
        },
        bossType: {
            type: String,
            maxlength: 250,
            required: true
        },
        bossLife: {
            type: String,
            maxlength: 250,
        },
        bossLevel: {
            type: String,
            maxlength: 250,
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("boss", bossSchema);