import { Request, Response } from "express";
import User from "../models/User.js";

export const createUser = async (
    req: Request, res: Response
) => {
    try {
        const { name, email } = req.body ?? {};

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const user = await User.create({ name, email });
        return res.status(201).json(user);
    }
    catch (error: unknown) {
        console.error('Failed to create user:', error);
        return res.status(500).json({
            message: 'Failed to create user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}