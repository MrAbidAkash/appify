/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Post from "@/lib/models/Post";
import mongoose from "mongoose";

export const GET = async () => {
  await connectToDatabase();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret",
      );
      userId = decoded.id;
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const postsWithCounts = await Post.aggregate([
      {
        $match: {
          $or: [
            { visibility: "public" },
            {
              visibility: "private",
              author: new mongoose.Types.ObjectId(userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $addFields: {
          totalReactions: { $size: { $ifNull: ["$reactions", []] } },
          totalComments: { $size: { $ifNull: ["$comments", []] } },
          userReaction: {
            $let: {
              vars: {
                reaction: {
                  $filter: {
                    input: "$reactions",
                    cond: {
                      $eq: [
                        "$$this.userId",
                        new mongoose.Types.ObjectId(userId),
                      ],
                    },
                  },
                },
              },
              in: {
                $cond: [
                  { $gt: [{ $size: "$$reaction" }, 0] },
                  { $arrayElemAt: ["$$reaction.type", 0] },
                  "",
                ],
              },
            },
          },
        },
      },

      // Lookup for author details
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" },

      // Unwind reactions to lookup users who reacted
      { $unwind: { path: "$reactions", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "reactions.userId",
          foreignField: "_id",
          as: "reactionUser",
        },
      },
      { $unwind: { path: "$reactionUser", preserveNullAndEmptyArrays: true } },

      // Group back to posts with enriched reactions array
      {
        $group: {
          _id: "$_id",
          authorDetails: { $first: "$authorDetails" },
          image: { $first: "$image" },
          title: { $first: "$title" },
          visibility: { $first: "$visibility" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          totalReactions: { $first: "$totalReactions" },
          totalComments: { $first: "$totalComments" },
          userReaction: { $first: "$userReaction" },
          reactions: {
            $push: {
              type: "$reactions.type",
              user: {
                _id: "$reactionUser._id",
                firstName: "$reactionUser.firstName",
                lastName: "$reactionUser.lastName",
                email: "$reactionUser.email",
              },
            },
          },
        },
      },

      // If there were no reactions, $push will create [null], fix that:
      {
        $addFields: {
          reactions: {
            $cond: [
              { $eq: [{ $size: "$reactions" }, 1] },
              {
                $cond: [
                  { $eq: [{ $arrayElemAt: ["$reactions.user", 0] }, null] },
                  [],
                  "$reactions",
                ],
              },
              "$reactions",
            ],
          },
        },
      },

      {
        $project: {
          author: {
            _id: "$authorDetails._id",
            firstName: "$authorDetails.firstName",
            lastName: "$authorDetails.lastName",
            email: "$authorDetails.email",
          },
          image: 1,
          title: 1,
          visibility: 1,
          createdAt: 1,
          updatedAt: 1,
          totalReactions: 1,
          totalComments: 1,
          userReaction: 1,
          reactedUsers: "$reactions", // This contains enriched reactions with user info
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json({ posts: postsWithCounts }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
