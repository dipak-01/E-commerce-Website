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
    cart: {
      type: [String],
      required: true
    },
    wishList: {
      type: [String],
      required: true
    },

  }, {timestamps: true });

const User = mongoose.model('User',userSchema)
module.exports = User;