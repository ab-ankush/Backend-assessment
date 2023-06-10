import mongoose, { Schema } from "mongoose";

// creating UseSchema to implement validation checks to ensure the data is formatted correctly and meets any specific requirements.
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 5,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      min: 10,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    },
    location: {
      type: String,
      required: true,
      min: 2,
    },
    accountStatus: {
      type: String,
      required: true,
      enum: ["open", "close"],
      default: "close",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
