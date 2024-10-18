import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
