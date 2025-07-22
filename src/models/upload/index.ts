import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUpload extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId?: mongoose.Types.ObjectId;
  fileSize?: number;
  fileUrl: string;
  originalName: string;
  fileType: "pdf" | "docx" | "json";
  createdAt: Date;
}

const UploadSchema = new Schema<IUpload>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    resumeId: { type: mongoose.Types.ObjectId, ref: "Resume" },
    fileUrl: { type: String, required: true },
    originalName: { type: String, required: true },
    fileType: { type: String, enum: ["pdf", "docx", "json"], required: true },
    fileSize: { type: Number }, 
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Upload: Model<IUpload> =
  mongoose.models.Upload || mongoose.model<IUpload>("Upload", UploadSchema);

export default Upload;