const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
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
        }
      }
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
      }
    ],
    addrs1: {
      type:String,
    },
    addrs2: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }, 
  {
    timestamps: true 
  }
  );

const User = mongoose.model('User',userSchema)
module.exports = User;