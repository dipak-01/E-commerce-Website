import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    contactNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      requireed: true,
    }
  }
)

const User = mongoose.model('User',userSchema)
export default User 