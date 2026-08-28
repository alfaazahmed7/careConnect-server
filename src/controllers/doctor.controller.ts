import { Request, Response } from "express";
import Doctor from "../models/Doctor.js";

export const getDoctors = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            q,
            location,
            specialty,
            rating,
            type,
            sort,
            page: requestedPage,
            limit: requestedLimit,
        } = req.query;

        const parsedPage = Number(requestedPage);
        const parsedLimit = Number(requestedLimit);
        const page = Number.isInteger(parsedPage) && parsedPage > 0
            ? parsedPage
            : 1;
        const limit = Number.isInteger(parsedLimit) && parsedLimit > 0
            ? Math.min(parsedLimit, 100)
            : 8;

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

        const total = await Doctor.countDocuments(query);
        let doctorsQuery = Doctor.find(query);

        if (sort === "rating") {
            doctorsQuery = doctorsQuery.sort({ "rating.average": -1 });

        } else if (sort === "experience") {
            doctorsQuery = doctorsQuery.sort({
                "professional.experience.years": -1,
            });

        } else if (sort === "fee_low") {
            doctorsQuery = doctorsQuery.sort({
                "professional.consultationFee.inPerson": 1,
            });

        } else if (sort === "fee_high") {
            doctorsQuery = doctorsQuery.sort({
                "professional.consultationFee.inPerson": -1,
            });

        } else {
            // recommended (default)
            doctorsQuery = doctorsQuery.sort({ "rating.average": -1 });
        }

        const doctors = await doctorsQuery
            .skip((page - 1) * limit)
            .limit(limit);

        // console.log(query, 'query');

        res.status(200).json({
            success: true,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
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

//              URL
//               │
//               ▼
//     /api/doctors?q=heart
//               │
//               ▼
//          req.query
//               │
//               ▼
//   ┌──────────────────────┐
//   │ Build `query` object  │
//   └──────────────────────┘
//               │
//     ┌─────────┼─────────┐
//     ▼         ▼         ▼
//   search   filters    rating
//     │         │         │
//     └─────────┼─────────┘
//               ▼
//       Doctor.find(query)
//               │
//               ▼
//          MongoDB
//               │
//               ▼
//           doctors
//               │
//               ▼
//            sort()
//               │
//               ▼
//       res.status(200).json()
//               │
//               ▼
//           Frontend