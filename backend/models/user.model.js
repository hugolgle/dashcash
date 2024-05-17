const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        pseudo: {
            type: String,
            required: true,
        },
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);