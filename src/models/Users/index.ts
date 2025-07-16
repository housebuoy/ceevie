import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  authId: string;
  name?: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    authId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    avatar: String,
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
