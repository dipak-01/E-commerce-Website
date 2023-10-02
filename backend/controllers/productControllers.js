// Required Model Imported
const Product = require("../models/productModel");

// Asynchronous function to Add Product in Database
const addProduct = async (req, res) => {
  try {
    // Creating New Product using Request Body
    const product = new Product(req.body);

    // Waiting for Product to get Saved in Database
    await product.save();
    res.status(201).send("Product Added Successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get Specific Product from Database
const getProduct = async (req, res) => {
  try {
    // Extracting ProductId from Request
    const productId = req.params.productId;

    // Searching for Product
    const result = await Product.findById(productId);
    res.status(200).send(result);
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get All Products from Database
const getAllproduct = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).send(result);
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Add Product Review in Specific Product
const addReview = async (req, res) => {
  // Extracting All Required Data from Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  const { rating, reviewmsg } = req.body;
  try {
    // Finding Specific Product using productId
    const product = await Product.findById(productId);

    // If Product is not Found in Database
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // If userId is not Present
    if (!userId) {
      return res.status(400).send("Please Login...");
    }

    // Iterating through Existing Reviews for the Product to Check if the User has already Reviewed it
    let reviewexist = null;
    for (const item of product.review) {
      if (typeof item.userId !== "undefined") {
        if (item.userId.equals(userId)) {
          reviewexist = item;
          break;
        }
      }
    }

    // If Review Exist then Update its Review else Push new Review in Array of Review
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

    // Waiting for Product Data to get Saved in Database
    await product.save();
    res.status(201).send("Review added to Product successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get All Review in Specific Product
const getReview = async (req, res) => {
  try {
    // If Request Parameter Contains Product Id then continue else send Response with Status code 400
    if (req.params.productId) {
      const productId = req.params.productId;

      // Finding Specific Product using productId
      const result = await Product.findById(productId);

      // Sending Data as Response
      const data = result.review;
      res.status(200).send(data);
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function for Search Bar
const search = async (req, res) => {
  try {
    // Extracting search query from the request's query parameters
    const query = req.query.query;

    // Checking if the query parameter is missing
    if (!query) {
      return res.status(400).send("Bad Request: Query parameter is missing.");
    }

    // Using Mongoose to search for products that match the search query in title or description
    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ],
    });

    // If No Matching Products were found then Sending Response with Status Code 404 else Sending Matching Products
    if (products.length === 0) {
      res.status(404).send("No matching products found.");
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Exporting all Functions
module.exports = {
  addProduct,
  getProduct,
  getAllproduct,
  getReview,
  addReview,
  search,
};
