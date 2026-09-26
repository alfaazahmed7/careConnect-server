import express from "express";
import { getDoctorBySlug, getDoctors } from "../controllers/doctor.controller.js";

const router = express.Router();

router.get('/doctors', getDoctors);
router.get('/doctors/:slug', getDoctorBySlug);

export default router;