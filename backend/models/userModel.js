// Mongoose library Imported for MongoDB interaction
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining User Schema using Mongoose
const userSchema = new Schema(
  {
    avatarUrl: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        size: {
          type: Number,
        },
      },
    ],
    wishList: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        size: {
          type: Number,
        },
      },
    ],
    orderPlaced: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        size: {
          type: Number,
        },
      },
    ],
    addrs1: {
      type: String,
    },
    addrs2: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Creating Mongoose model using the User Schema
const User = mongoose.model("User", userSchema);

// Exporting User Model
module.exports = User;
