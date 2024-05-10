const mongoose = import("mongoose");

const operationSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: false,
        },
        action: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        crediteur: {
            type: String,
            required: false,
        },
        categorie: {
            type: String,
            required: false,
        },
        titre: {
            type: String,
            required: false,
        },
        date: {
            type: String,
            required: true,
        },
        remboursement: {
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