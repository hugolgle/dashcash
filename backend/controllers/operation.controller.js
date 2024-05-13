const OperationModel = require("../models/operation.model");

module.exports.setOperations = async (req, res) => {
    try {
        if (!req.body.date || !req.body.montant) {
            return res.status(400).json({ message: "Veuillez fournir les informations nécessaires" });
        }

        const operation = await OperationModel.create({
            // user: req.body.user,
            type: req.body.type,
            categorie: req.body.categorie,
            titre: req.body.titre,
            date: req.body.date,
            detail: req.body.detail || '',
            montant: req.body.montant,
        });

        return res.status(201).json(operation);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la création de l'opération", error });
    }
};

module.exports.getOperations = async (req, res) => {
    try {
        const operations = await OperationModel.find();
        return res.status(200).json(operations);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des opérations", error });
    }
};

module.exports.getOperation = async (req, res) => {
    try {
        const operations = await OperationModel.findById(req.params.id);
        return res.status(200).json(operations);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération de l'operation", error });
    }
};

module.exports.editOperation = async (req, res) => {
    try {
        const operation = await OperationModel.findById(req.params.id);

        if (!operation) {
            return res.status(400).json({ message: "Cette opération n'existe pas" });
        }

        const updatedOperation = await OperationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(updatedOperation);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'opération", error });
    }
};

module.exports.deleteOperation = async (req, res) => {
    try {
        const operation = await OperationModel.findById(req.params.id);

        if (!operation) {
            return res.status(400).json({ message: "Cette opération n'existe pas" });
        }

        await operation.deleteOne({ _id: req.params.id });

        return res.status(200).json({ message: `Opération supprimée avec succès: ${req.params.id}` });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression de l'opération", error });
    }
};