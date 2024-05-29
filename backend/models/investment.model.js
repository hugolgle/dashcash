const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        plateforme: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: false,
        },
        date: {
            type: String,
            required: true,
        },
        montant: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("investment", investmentSchema);