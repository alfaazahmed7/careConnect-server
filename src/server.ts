import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CareConnect Server is Working Properly!");
});

// routes import
import doctorsRoute from './routes/doctor.routes.js';

// routes
app.use('/api/doctors', doctorsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});