/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import User from "@/lib/models/User";
import Reply from "@/lib/models/Reply";

void User;
void Reply;

function shortTime(date: Date) {
  const long = dayjs(date).fromNow(true);
  const short = long
    .replace(/a few seconds?/, "5s")
    .replace(/\ban? /, "1")
    .replace("seconds", "s")
    .replace("second", "s")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d")
    .replace("months", "mo")
    .replace("month", "mo")
    .replace("years", "y")
    .replace("year", "y");

  return short.replace(/\s+/g, "");
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id: postId } = await params;
    console.log("Fetching comments for postId:", postId);

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

    // Query comments for this post
    const comments = await Comment.find({ post: postId })
      .populate({ path: "author", select: "firstName lastName" })
      .populate({
        path: "replies",
        populate: { path: "author", select: "firstName lastName" },
      })
      .populate({ path: "reactions.userId", select: "firstName lastName" })
      .sort({ createdAt: -1 })
      .lean();

    console.log("Comments found:", comments.length);

    if (!comments.length) {
      return NextResponse.json({ success: true, comments: [] });
    }

    // Add userReaction per comment
    const commentsWithUserReaction = comments.map((comment) => {
      let userReaction = "";

      if (userId && Array.isArray(comment.reactions)) {
        const reaction = comment.reactions.find(
          (r: any) => r.userId?._id.toString() === userId.toString(),
        );
        if (reaction) {
          userReaction = reaction.type || "";
        }
      }

      return {
        ...comment,
        createdAt: shortTime(comment.createdAt),
        userReaction,
      };
    });

    return NextResponse.json({
      success: true,
      comments: commentsWithUserReaction,
    });
  } catch (error) {
    console.error("Error in GET comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
