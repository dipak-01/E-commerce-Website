const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    imgName:{
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
      // required: true,
    },
    colour: {
      type: String,
      required:true,
    },
    inStock: {
      type: Boolean,
      default : true
      // required: true,
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
  }, 
  {
    timestamps: true
  }
  );
const Product = mongoose.model('Product',productSchema)
module.exports = Product;

