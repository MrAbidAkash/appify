// src/lib/models/Post.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  image?: string;
  isPrivate: boolean;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String },
    isPrivate: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
