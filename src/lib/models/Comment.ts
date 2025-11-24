// src/lib/models/Comment.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComment extends Document {
  post: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  replies: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true },
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
