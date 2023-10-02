// Mongoose library Imported for MongoDB interaction
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining Product Schema using Mongoose
const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    imgName: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
      required: true,
    },
    size: {
      type: String,
      default: "6, 7, 8, 9, 10, 11, 12",
    },
    colour: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageUrl1: {
      type: String,
      unique: true,
      required: true,
    },
    imageUrl2: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    review: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        rating: {
          type: Number,
        },
        reviewmsg: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Creating Mongoose model using the Product Schema
const Product = mongoose.model("Product", productSchema);

// Exporting Product Model
module.exports = Product;
