import dotenv from "dotenv";
import express from "express"; // Utilisez import pour express
import connectDB from "./config/db.js"; // Utilisez import pour connectDB
import cors from "cors";

const port = 5001;
dotenv.config();

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import operationRoutes from "./routes/operation.routes"; // Utilisez import pour les routes
import userRoutes from "./routes/user.routes";

app.use("/operation", operationRoutes);
app.use("/user", userRoutes);

app.listen(port, () => console.log("Le serveur a démarré au port " + port));
