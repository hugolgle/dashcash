const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // Ajoutez cette ligne

const port = 5001;
const dotenv = require("dotenv").config();

connectDB();
const app = express();

app.use(cors()); // Utilisez le middleware cors

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/operation", require("./routes/operation.routes"));
app.use("/user", require("./routes/user.routes"));

app.listen(port, () => console.log("Le serveur a démarré au port " + port));