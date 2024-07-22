const SubscriptionModel = require("../models/subscription.model");

module.exports.setSubscriptions = async (req, res) => {
    try {

        const subscription = await SubscriptionModel.create({
            user: req.body.user,
            titre: req.body.titre,
            detail: req.body.detail || '',
            montant: req.body.montant,
            recurrence: req.body.recurrence,
        });

        return res.status(201).json(subscription);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la création de l'abonnement", error });
    }
};

module.exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await SubscriptionModel.find();
        return res.status(200).json(subscriptions);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des abonnements", error });
    }
};

module.exports.getSubscription = async (req, res) => {
    try {
        const subscriptions = await SubscriptionModel.findById(req.params.id);
        return res.status(200).json(subscriptions);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération de l'abonnement", error });
    }
};

module.exports.editSubscription = async (req, res) => {
    try {
        const subscription = await SubscriptionModel.findById(req.params.id);

        if (!subscription) {
            return res.status(400).json({ message: "Cette abonnement n'existe pas" });
        }

        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(updatedSubscription);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'abonnement", error });
    }
};

module.exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await SubscriptionModel.findById(req.params.id);

        if (!subscription) {
            return res.status(400).json({ message: "Cette abonnement n'existe pas" });
        }

        await subscription.deleteOne({ _id: req.params.id });

        return res.status(200).json({ message: `Abonnement supprimée avec succès: ${req.params.id}` });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression de l'abonnement", error });
    }
};