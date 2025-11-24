// src/lib/models/Reply.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReply extends Document {
  comment: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema: Schema<IReply> = new Schema(
  {
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Reply: Model<IReply> =
  mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
export default Reply;
