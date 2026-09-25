import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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

export default app;