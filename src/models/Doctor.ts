import mongoose, { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        role: {
            type: String,
            enum: ["doctor"],
            default: "doctor",
        },

        // Account

        account: {
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },

            phone: {
                type: String,
                default: null,
            },

            emailVerified: {
                type: Boolean,
                default: false,
            },

            phoneVerified: {
                type: Boolean,
                default: false,
            },

            accountStatus: {
                type: String,
                enum: ["active", "suspended", "blocked", "deleted"],
                default: "active",
            },

            lastLoginAt: {
                type: Date,
                default: null,
            },

            createdAt: {
                type: Date,
                default: Date.now,
            },

            updatedAt: {
                type: Date,
                default: Date.now,
            },
        },

        // ==========================================
        // Profile
        // ==========================================

        profile: {
            firstName: {
                type: String,
                required: true,
                trim: true,
            },

            lastName: {
                type: String,
                required: true,
                trim: true,
            },

            fullName: {
                type: String,
                required: true,
                trim: true,
            },

            title: {
                type: String,
                default: "Dr.",
            },

            gender: {
                type: String,
                enum: ["male", "female", "other"],
                default: null,
            },

            dateOfBirth: {
                type: Date,
                default: null,
            },

            profileImage: {
                type: String,
                default: null,
            },

            coverImage: {
                type: String,
                default: null,
            },

            professionalTitle: {
                type: String,
                default: null,
                trim: true,
            },

            shortBio: {
                type: String,
                default: null,
            },

            about: {
                type: String,
                default: null,
            },

            languages: {
                type: [String],
                default: [],
            },

            genderPreference: {
                type: String,
                enum: ["male", "female", "any"],
                default: "any",
            },

            location: {
                country: {
                    type: String,
                    default: null,
                },

                division: {
                    type: String,
                    default: null,
                },

                city: {
                    type: String,
                    default: null,
                },

                area: {
                    type: String,
                    default: null,
                },

                address: {
                    type: String,
                    default: null,
                },

                postalCode: {
                    type: String,
                    default: null,
                },

                coordinates: {
                    latitude: {
                        type: Number,
                        default: null,
                    },

                    longitude: {
                        type: Number,
                        default: null,
                    },
                },
            },
        },

        // ==========================================
        // Professional
        // ==========================================

        professional: {
            specialties: {
                type: [
                    {
                        name: {
                            type: String,
                            required: true,
                            trim: true,
                        },

                        isPrimary: {
                            type: Boolean,
                            default: false,
                        },
                    },
                ],
                default: [],
            },

            subSpecialties: {
                type: [String],
                default: [],
            },

            license: {
                licenseNumber: {
                    type: String,
                    default: null,
                },

                issuingAuthority: {
                    type: String,
                    default: null,
                },

                country: {
                    type: String,
                    default: null,
                },

                issueDate: {
                    type: Date,
                    default: null,
                },

                expiryDate: {
                    type: Date,
                    default: null,
                },

                status: {
                    type: String,
                    enum: ["pending", "verified", "rejected", "expired"],
                    default: "pending",
                },
            },

            experience: {
                years: {
                    type: Number,
                    default: 0,
                    min: 0,
                },

                startedPracticing: {
                    type: Number,
                    default: null,
                },
            },

            consultationTypes: {
                type: [String],
                enum: ["in_person", "video", "audio"],
                default: [],
            },

            consultationFee: {
                currency: {
                    type: String,
                    default: "BDT",
                },

                inPerson: {
                    type: Number,
                    default: null,
                },

                video: {
                    type: Number,
                    default: null,
                },

                audio: {
                    type: Number,
                    default: null,
                },
            },

            followUpFee: {
                currency: {
                    type: String,
                    default: "BDT",
                },

                inPerson: {
                    type: Number,
                    default: null,
                },

                video: {
                    type: Number,
                    default: null,
                },

                audio: {
                    type: Number,
                    default: null,
                },
            },
        },

        // ==========================================
        // Education
        // ==========================================

        education: {
            type: [
                {
                    degree: {
                        type: String,
                        required: true,
                    },

                    field: {
                        type: String,
                        default: null,
                    },

                    institution: {
                        type: String,
                        required: true,
                    },

                    location: {
                        type: String,
                        default: null,
                    },

                    startYear: {
                        type: Number,
                        default: null,
                    },

                    endYear: {
                        type: Number,
                        default: null,
                    },

                    description: {
                        type: String,
                        default: null,
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Certifications
        // ==========================================

        certifications: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },

                    issuingOrganization: {
                        type: String,
                        default: null,
                    },

                    issueDate: {
                        type: Date,
                        default: null,
                    },

                    expiryDate: {
                        type: Date,
                        default: null,
                    },

                    credentialId: {
                        type: String,
                        default: null,
                    },

                    verificationStatus: {
                        type: String,
                        enum: ["pending", "verified", "rejected"],
                        default: "pending",
                    },

                    documentUrl: {
                        type: String,
                        default: null,
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Experience History
        // ==========================================

        experienceHistory: {
            type: [
                {
                    position: {
                        type: String,
                        required: true,
                    },

                    organization: {
                        type: String,
                        required: true,
                    },

                    location: {
                        type: String,
                        default: null,
                    },

                    startDate: {
                        type: Date,
                        default: null,
                    },

                    endDate: {
                        type: Date,
                        default: null,
                    },

                    current: {
                        type: Boolean,
                        default: false,
                    },

                    description: {
                        type: String,
                        default: null,
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Hospital Affiliations
        // ==========================================

        hospitalAffiliations: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },

                    department: {
                        type: String,
                        default: null,
                    },

                    position: {
                        type: String,
                        default: null,
                    },

                    address: {
                        type: String,
                        default: null,
                    },

                    phone: {
                        type: String,
                        default: null,
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Services
        // ==========================================

        services: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },

                    description: {
                        type: String,
                        default: null,
                    },

                    durationMinutes: {
                        type: Number,
                        default: 30,
                    },

                    fee: {
                        type: Number,
                        default: null,
                        min: 0,
                    },

                    currency: {
                        type: String,
                        default: "BDT",
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Availability
        // ==========================================

        availability: {
            timezone: {
                type: String,
                default: "Asia/Dhaka",
            },

            weeklySchedule: {
                sunday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: {
                                    type: String,
                                    required: true,
                                },

                                end: {
                                    type: String,
                                    required: true,
                                },
                            },
                        ],

                        default: [],
                    },
                },

                monday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },

                tuesday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },

                wednesday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },

                thursday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },

                friday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },

                saturday: {
                    available: {
                        type: Boolean,
                        default: false,
                    },

                    slots: {
                        type: [
                            {
                                start: String,
                                end: String,
                            },
                        ],

                        default: [],
                    },
                },
            },

            appointmentDurationMinutes: {
                type: Number,
                default: 30,
            },

            bufferBetweenAppointmentsMinutes: {
                type: Number,
                default: 10,
            },

            advanceBookingDays: {
                type: Number,
                default: 30,
            },

            minimumCancellationNoticeHours: {
                type: Number,
                default: 12,
            },
        },

        // ==========================================
        // Verification
        // ==========================================

        verification: {
            status: {
                type: String,
                enum: [
                    "not_started",
                    "incomplete",
                    "submitted",
                    "under_review",
                    "verified",
                    "rejected",
                ],
                default: "not_started",
            },

            verifiedAt: {
                type: Date,
                default: null,
            },

            verifiedBy: {
                type: String,
                default: null,
            },

            documents: {
                type: [
                    {
                        type: {
                            type: String,
                            enum: [
                                "medical_license",
                                "national_id",
                                "degree_certificate",
                            ],
                            required: true,
                        },

                        documentUrl: {
                            type: String,
                            required: true,
                        },

                        status: {
                            type: String,
                            enum: ["pending", "approved", "rejected"],
                            default: "pending",
                        },
                    },
                ],

                default: [],
            },
        },

        // ==========================================
        // Rating
        // ==========================================

        rating: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },

            totalReviews: {
                type: Number,
                default: 0,
            },

            distribution: {
                "1": {
                    type: Number,
                    default: 0,
                },

                "2": {
                    type: Number,
                    default: 0,
                },

                "3": {
                    type: Number,
                    default: 0,
                },

                "4": {
                    type: Number,
                    default: 0,
                },

                "5": {
                    type: Number,
                    default: 0,
                },
            },
        },

        // ==========================================
        // Statistics
        // ==========================================

        statistics: {
            totalAppointments: {
                type: Number,
                default: 0,
            },

            completedAppointments: {
                type: Number,
                default: 0,
            },

            cancelledAppointments: {
                type: Number,
                default: 0,
            },

            noShowAppointments: {
                type: Number,
                default: 0,
            },

            totalPatients: {
                type: Number,
                default: 0,
            },

            returningPatients: {
                type: Number,
                default: 0,
            },

            averageConsultationDuration: {
                type: Number,
                default: 0,
            },

            profileViews: {
                type: Number,
                default: 0,
            },
        },

        // ==========================================
        // Preferences
        // ==========================================

        preferences: {
            acceptingNewPatients: {
                type: Boolean,
                default: true,
            },

            acceptsEmergencyAppointments: {
                type: Boolean,
                default: false,
            },

            autoConfirmAppointments: {
                type: Boolean,
                default: false,
            },

            allowPatientMessages: {
                type: Boolean,
                default: true,
            },

            showPhoneNumber: {
                type: Boolean,
                default: false,
            },

            showEmail: {
                type: Boolean,
                default: false,
            },
        },

        // ==========================================
        // Notifications
        // ==========================================

        notifications: {
            email: {
                type: Boolean,
                default: true,
            },

            sms: {
                type: Boolean,
                default: true,
            },

            push: {
                type: Boolean,
                default: true,
            },

            appointmentReminders: {
                type: Boolean,
                default: true,
            },

            newMessageNotifications: {
                type: Boolean,
                default: true,
            },

            paymentNotifications: {
                type: Boolean,
                default: true,
            },

            reviewNotifications: {
                type: Boolean,
                default: true,
            },
        },

        // ==========================================
        // Payment
        // ==========================================

        payment: {
            currency: {
                type: String,
                default: "BDT",
            },

            paymentMethods: {
                type: [String],
                enum: ["card", "mobile_banking"],
                default: [],
            },

            stripeAccountId: {
                type: String,
                default: null,
            },

            payoutEnabled: {
                type: Boolean,
                default: false,
            },
        },

        // ==========================================
        // SEO
        // ==========================================

        seo: {
            slug: {
                type: String,
                unique: true,
                sparse: true,
                lowercase: true,
                trim: true,
            },

            metaTitle: {
                type: String,
                default: null,
            },

            metaDescription: {
                type: String,
                default: null,
            },
        },

        // ==========================================
        // Badges
        // ==========================================

        badges: {
            type: [
                {
                    type: {
                        type: String,
                        required: true,
                    },

                    label: {
                        type: String,
                        required: true,
                    },
                },
            ],

            default: [],
        },

        // ==========================================
        // Doctor Status
        // ==========================================

        status: {
            type: String,
            enum: ["active", "inactive", "pending", "suspended"],
            default: "pending",
        },
    },

    {
        timestamps: true,
    }
);

// ==========================================
// Indexes
// ==========================================

DoctorSchema.index({
    "profile.fullName": "text",
    "profile.professionalTitle": "text",
    "professional.specialties.name": "text",
});

DoctorSchema.index({
    "professional.specialties.name": 1,
});

DoctorSchema.index({
    "profile.location.city": 1,
});

DoctorSchema.index({
    "rating.average": -1,
});

DoctorSchema.index({
    status: 1,
});

// ==========================================
// Model
// ==========================================

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;