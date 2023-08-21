import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productDiscription: {
      type: String,
    },
    productSize: {
      type: String,
      required: true,
    },
    productColour: {
      type: String,
    },
    productInStock: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: String,
      unique: true,
      required: true,
    }
  }
)

const Product = mongoose.model('Product',productSchema)
export default Product
