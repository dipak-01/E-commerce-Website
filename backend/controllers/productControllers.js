const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    const result = await product.save();
    res.send("Product Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await Product.findById(productId);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const getAllproduct = async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const addReview = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  const { rating, reviewmsg } = req.body;
  console.log(productId);
  console.log(userId);
  console.log({ rating, reviewmsg });

  try {
    // Check if the product with the given ID exists
    const product = await Product.findById(productId);

    // Find the product by ID and update their cart
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!userId) {
      return res.status(404).send("Please Login...");
    }
    let reviewexist = null;
    for (const item of product.review) {
      if (typeof item.userId !== 'undefined') {
        // item.userId is defined, and its type is not 'undefined'
        // You can perform comparisons or operations on item.userId here
        if (item.userId.equals(userId)) {
          reviewexist = item;
          break; // Exit the loop once a matching item is found
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
    res.status(200).send("Review added to Product successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getReview = async (req, res) => {
  try {
    if (req.params.productId) {
      console.log(req.params.productId);
      const productId = req.params.productId;
      const result = await Product.findById(productId);
      console.log(result);
      const data = result.review;
      res.send(data);
    } else {
      console.log("cookie not found");
      res.send(req.cookies);
    }
  } catch (err) {
    console.log(err);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).send("Bad Request: Query parameter is missing.");
    }

    // Use a regular expression to perform a case-insensitive search
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
