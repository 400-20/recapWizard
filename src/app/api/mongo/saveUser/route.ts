/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User"; // Ensure this path is correct

// MongoDB Connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any);
};

// POST request to save user
export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, image } = await req.json();

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, image });
            await user.save();
        }

        return NextResponse.json({ message: "User saved successfully" });
    } catch (error:any) {
        return NextResponse.json({ error: `Error saving user${error}` }, { status: 500 });
    }
}
