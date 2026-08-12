import Doctor from "../models/Doctor.js"
import { Request, Response } from "express";

export const getDoctors = async (
    req: Request, res: Response
) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to get doctors data`, error });
    }
}