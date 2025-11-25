/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";
import fs from "fs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // <- import this

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const cookieStore = await cookies(); // get cookies
    const token = cookieStore.get("token")?.value; // read token
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", status: 401 },
        { status: 401 },
      );
    }

    // verify token
    let userId: string;
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret",
      );
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid token", status: 401 },
        { status: 401 },
      );
    }

    // get body
    const body = await request.json();
    const { title, image, visibility } = body;

    let imagePath = "";
    if (image) {
      // image is base64: "data:image/png;base64,xxxx"
      const matches = image.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1].split("/")[1];
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        imagePath = `/uploads/${Date.now()}.${ext}`;
        fs.writeFileSync(`./public${imagePath}`, buffer);
      }
    }

    // create post with author
    const post = await Post.create({ title, image: imagePath, author: userId, visibility });

    return NextResponse.json({ post, status: 201 }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post", status: 500 },
      { status: 500 },
    );
  }
}
