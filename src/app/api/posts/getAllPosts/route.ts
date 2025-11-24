/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User"; // <-- IMPORTANT: register the schema

// Ensure the User model is loaded to register the schema
void User;

export const GET = async () => {
  await connectToDatabase();

  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "_id firstName lastName email",
      })
      .lean()
      .sort({ createdAt: -1 });
    return NextResponse.json({ posts, status: 200 }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 },
    );
  }
};
