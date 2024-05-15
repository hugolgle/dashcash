const mongoose = require("mongoose");

const operationSchema = mongoose.Schema(
    {
        // user: {
        //     type: String,
        //     required: false,
        // },
        type: {
            type: String,
            required: true,
        },
        categorie: {
            type: String,
            required: true,
        },
        autreCategorie: {
            type: String,
            required: false,
        },
        titre: {
            type: String,
            required: true,
        },
        date: {
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("operation", operationSchema);