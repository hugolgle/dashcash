const bcrypt = require('bcrypt');
const UserModel = require("../models/user.model");

module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }
};

module.exports.addUser = async (req, res) => {
    try {
        const { username, password, pseudo, nom, prenom, image } = req.body;

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà" });
        }

        // Hash du mot de passe avant de l'enregistrer
        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            password,
            pseudo,
            nom,
            prenom
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur", error });
    }
};

module.exports.editUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: "Cette utilisateur n'existe pas" });
        }

        await user.deleteOne({ _id: req.params.id });

        return res.status(200).json({ message: `Utilisateur supprimée avec succès: ${req.params.id}` });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
};