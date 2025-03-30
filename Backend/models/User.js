import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },

    otpCreatedat: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
