/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // params is now a Promise
  try {
    await connectToDatabase();

    const { reaction } = await req.json();
    // reaction = "like" | "love" | "haha" | "wow" | "sad" | "angry"

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let userId: string | null = null;
    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "secret",
        );
        userId = decoded.id;
        console.log("Authenticated userId:", userId);
      } catch (err) {
        console.warn("Invalid token", err);
      }
    }

    console.log("userId,", userId);
    console.log("reaction,", reaction);

    // Await the params Promise to get the actual params object
    const { id: commentId } = await params;
    console.log("commentId,", commentId);

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // find existing reaction by this user
    const existing = comment.reactions.find((r: any) => r.userId === userId);

    //existing.type === reaction ||
    if (existing) {
      if (reaction === null) {
        // Null reaction → remove (unreact)
        comment.reactions = comment.reactions.filter(
          (r: any) => r.userId.toString() !== userId,
        );
      } else {
        // Different reaction → update to new one
        existing.type = reaction;
      }
    } else {
      // No reaction → add new
      comment.reactions.push({ userId, type: reaction });
    }

    await comment.save();

    return NextResponse.json({
      success: true,
      reactions: comment.reactions,
    });
  } catch (err: any) {
    console.log("error in comment reaction route", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
