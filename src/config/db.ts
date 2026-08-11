import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI as string;
        if (!mongoUri) {
            throw new Error('MongoDB connection failed');
        }
        await mongoose.connect(mongoUri);
        console.log('MongoDB connection successful');
        console.log("Database:", mongoose.connection.name);
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
}