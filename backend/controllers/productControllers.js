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

    // Check if the product is already in the user's cart
    const reviewexist = product.review.find((item) =>
      item.userId.equals(userId)
    );

    if (reviewexist) {
      // Increment the quantity if the product is already in the cart
      reviewexist.rating = rating;
      reviewexist.reviewmsg = reviewmsg;
    } else {
      // Add the product to the user's cart if it's not there
      product.review.push({
        userId: userId,
        rating: rating,
        reviewmsg: reviewmsg,
      });
    }

    // Save the user's updated cart
    await product.save();
    res.status(200).send("Review added to Product successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
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
  addReview,
  search,
};
