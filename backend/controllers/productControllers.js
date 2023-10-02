const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(201).send("Product Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await Product.findById(productId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllproduct = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const addReview = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  const { rating, reviewmsg } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!userId) {
      return res.status(400).send("Please Login...");
    }
    let reviewexist = null;
    for (const item of product.review) {
      if (typeof item.userId !== "undefined") {
        if (item.userId.equals(userId)) {
          reviewexist = item;
          break;
        }
      }
    }
    if (reviewexist) {
      reviewexist.rating = rating;
      reviewexist.reviewmsg = reviewmsg;
    } else {
      product.review.push({
        userId: userId,
        rating: rating,
        reviewmsg: reviewmsg,
      });
    }
    await product.save();
    res.status(201).send("Review added to Product successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getReview = async (req, res) => {
  try {
    if (req.params.productId) {
      const productId = req.params.productId;
      const result = await Product.findById(productId);
      const data = result.review;
      res.status(200).send(data);
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).send("Bad Request: Query parameter is missing.");
    }
    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ],
    });
    if (products.length === 0) {
      res.status(404).send("No matching products found.");
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addProduct,
  getProduct,
  getAllproduct,
  getReview,
  addReview,
  search,
};
