import { Request, Response } from "express";
import Doctor from "../models/Doctor.js";

export const getDoctors = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { q, location, specialty, rating, type, sort } = req.query;

        // Start with active doctors only
        const query: Record<string, any> = {
            status: "active",
        };

        // Search by doctor's name, title, or specialty
        if (q) {
            query.$or = [
                {
                    "profile.fullName": {
                        $regex: String(q),
                        $options: "i",
                    },
                },
                {
                    "profile.professionalTitle": {
                        $regex: String(q),
                        $options: "i",
                    },
                },
                {
                    "professional.specialties.name": {
                        $regex: String(q),
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by city
        if (location) {
            query["profile.location.city"] = {
                $regex: String(location),
                $options: "i",
            };
        }

        // Filter by specialty
        if (specialty) {
            query["professional.specialties.name"] = {
                $in: String(specialty).split(","),
            };
        }

        // Filter by minimum rating
        if (rating) {
            query["rating.average"] = {
                $gte: Number(rating),
            };
        }

        // Filter by consultation type
        if (type && type !== "all") {
            query["professional.consultationTypes"] = String(type);
        }

        // Fetch doctors from MongoDB
        let doctors = await Doctor.find(query);

        if (sort === "rating") {
            doctors = await Doctor.find(query).sort({ "rating.average": -1 });

        } else if (sort === "experience") {
            doctors = await Doctor.find(query).sort({
                "professional.experience.years": -1,
            });

        } else if (sort === "fee_low") {
            doctors = await Doctor.find(query).sort({
                "professional.consultationFee.inPerson": 1,
            });

        } else if (sort === "fee_high") {
            doctors = await Doctor.find(query).sort({
                "professional.consultationFee.inPerson": -1,
            });

        } else {
            // recommended (default)
            doctors = await Doctor.find(query).sort({ "rating.average": -1 });
        }

        res.status(200).json({
            success: true,
            total: doctors.length,
            doctors,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors.",
        });
    }
};