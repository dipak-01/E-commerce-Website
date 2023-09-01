const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/dbconnect");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const cors = require("cors");
const app = express();
// const session = require('express-session');

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `\nServer Started...\nSuccessfully Connected to Database...\nListening to Requests at Port: ${port}`
      );
    });
  })
  .catch((err) => {
    console.console(err);
  });


  // app.use((req, res, next) => {
  //   console.log('Session:', req.session);
  //   next();
  // });


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()),
// app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("\nNew Request Made :");
  console.log("Host : ", req.hostname);
  console.log("Path : ", req.path);
  console.log("Method : ", req.method);
  next();
});

app.post("/add-product", async(req, res) => {
  try{
    console.log(req.body);
    const product = new Product(req.body);
    const result = await product.save()
    res.send("Product Added Successfully");
  }catch(err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  };
});

app.get("/product/:id", async(req, res) => {
  try{
    const id = req.params.id;
    const result = await Product.findById(id)
    res.send(result);
    }catch(err) {
      console.log(err);
    };
});

app.get("/explore-all", async(req, res) => {
  try{
    const result = await Product.find();
    res.send(result);
  }catch(err) {
    console.log(err);
  };
});

app.post("/user-signup", async(req, res) => {
  try{
    console.log(req.body);
    const user = new User(req.body);
    const result = await user.save()
    res.send("Successfully Signed Up");
  }catch(err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  };
});

app.get("/cart", async(req, res) => {
  try{
    const result = await User.findById('64f1e1f9fa77cabb55138ad3')
    console.log(result);
    const data = result.cart;
    res.send(data);
    }catch(err){
      console.log(err);
    };
});





// app.use(session({
//   secret: 'your-secret-key', // A secret key used for session data encryption
//   resave: false, // Do not resave session data if not modified
//   saveUninitialized: true, // Save new, uninitialized sessions
//   cookie: { secure: false } // Set secure to true for production with HTTPS
// }));

// app.post('/user-login', (req, res) => {
//   // Validate user credentials
//   if (validCredentials) {
  //     // Set session data
  //     req.session.user = { username: req.body.username };
  //     res.send('Logged in successfully');
//   } else {
//     res.status(401).send('Authentication failed');
//   }
// });
