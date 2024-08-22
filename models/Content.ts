import mongoose, { Document, Model, Schema } from "mongoose";

// Define the interface for a Comment
interface IComment {
  author: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

// Define the interface for the Content document
interface IContent extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  comments: IComment[];
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Comment schema
const CommentSchema = new Schema<IComment>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Content schema
const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [CommentSchema],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
ContentSchema.pre<IContent>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Export the Content model
const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);

export default Content;
