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
app.use(
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public")
);

app.use((req, res, next) => {
  console.log("\nNew Request Made :");
  console.log("Host : ", req.hostname);
  console.log("Path : ", req.path);
  console.log("Method : ", req.method);
  next();
});

app.post("/user-signup", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect("landingPage.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add-product", (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      res.redirect("/add-product");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/explore-all", (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/user-signin", (req, res) => {
//   User.findOne({ phone: "7741952745" })
//     .then((result) => {
//       console.log(result);
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });




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
