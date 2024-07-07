import mongoose from "mongoose";
import crypto from "crypto";

export interface ShortUrls extends mongoose.Document {
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  clickCount: number;
}

function makeStrGenerator(n: number) {
  return () => crypto.randomBytes(n).toString("base64url").substring(0, 5);
}

const ShortUrlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    default: makeStrGenerator(5),
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.ShortUrl ||
  mongoose.model<ShortUrls>("ShortUrl", ShortUrlSchema);
