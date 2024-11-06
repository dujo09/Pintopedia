import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
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
  likedBeers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Beer",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
