const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        titre: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: false,
        },
        montant: {
            type: String,
            required: true,
        },
        recurrence: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
