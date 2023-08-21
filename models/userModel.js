import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
    },
    contactNumber: {
      type: Number,
      unique: true,
      required: true,
    }
  }
)

const User = mongoose.model('User',userSchema)
export default User 