const User = require("./models/userModel");
const Product = require("./models/productModel");
const connectDb = require("./config/dbconnect");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const port = process.env.PORT || 3000;

if (connectDb()) {
  try {
    app.listen(port, () => {
      console.log(
        `\nServer Started...\nSuccessfully Connected to Database...\nListening to Requests at Port: ${port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
} else {
  console.log("Server Error");
}

// app.use((req, res, next) => {
//   console.log('Session:', req.session);
//   next();
// });

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json()),
  // app.use(express.static("public"));

  // app.use((req,res,next)=>{
  //   if(req.session.user){next()}
  //   else{
  //     res.status(401).send("Please Login!!!")
  //   }
  // })

  app.use((req, res, next) => {
    console.log("\nNew Request Made :");
    console.log("Host : ", req.hostname);
    console.log("Path : ", req.path);
    console.log("Method : ", req.method);
    next();
  });

app.post("/add-product", async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    const result = await product.save();
    res.send("Product Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/explore-all", async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/user-signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    const result = await user.save();
    res.send("Successfully Signed Up");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user-logout", async (req, res) => {
  try {
    if (req.cookies.userId) {
      // User is logged in, so we can proceed with logging them out

      res.clearCookie("userId");
      console.log("Cookie Cleared");
      res.send("Successfully Logged Out");
    } else {
      // User is not logged in
      res.status(401).json({ message: "User Not logged In" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/user-login", async (req, res) => {
  try {
    const { usremail, usrpassword } = req.body;
    const user = await User.findOne({ email: usremail });
    const passwordmatch = user.password == usrpassword;
    if (passwordmatch) {
      if (req.cookies.userId) {
        console.log("User is Already logged In...");
        res.status(200).json({ message: "Already Logged In" });
      } else {
        res.cookie("userId", user._id, {
          httpOnly: false,
          sameSite: "none",
          secure: true,
        });
        console.log("User Successfully Logged In...");
        res.status(200).json({ message: "Successfully Logged In" });
      }
    } else {
      res.status(401).json({ message: "Invalid Username or Password!!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// app.post("/user-login", async (req, res) => {
//   const { useremail, usrpassword } = req.body;
//   const user = await User.findOne({ email: useremail });

//   if (!user) {
//     return res.status(401).send("User not found");
//   }

//   // Check if the password matches using a secure method (e.g., bcrypt)
//   const isPasswordValid = await user.comparePassword(usrpassword);

//   if (!isPasswordValid) {
//     return res.status(401).send("Invalid password");
//   }

//   const id = user._id;

//   // Set the user ID in a cookie
//   res.cookie("userId", id, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//   });

//   console.log("Cookie Stored: " + req.cookies.userId);
//   console.log("User Successfully Logged In...");
//   console.log(req.cookies);

//   res.send("Logged in successfully!");
// });

// app.post("/user-logout", async (req, res) => {
//   try {
//     if (req.session.userId) {
//       // User is logged in, so we can proceed with logging them out
//       req.session.destroy((err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error occurred during logout");
//         } else {
//           res.clearCookie("connect.sid");
//           console.log("Cookie Cleared");
//           res.send("Successfully Logged Out");
//         }
//       });
//     } else {
//       // User is not logged in
//       res.status(401).send("User Not logged In");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/cart", async (req, res) => {
//   try {
//     const result = await User.findById("64f1e1f9fa77cabb55138ad3");
//     console.log(result);
//     const data = result.cart;
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/cart", async (req, res) => {
  try {
    if (req.cookies.userId) {
      console.log(req.cookies.userId);
      const id = req.cookies.userId;
      console.log("working");
      const result = await User.findById(id);
      console.log(result);
      const data = result.cart;
      res.send(data);
    } else {
      console.log("cookie not found");
      res.send(req.cookies);
    }
  } catch (err) {
    console.log(err);
  }
});

app.put("/add-to-cart/:productId", async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId; // Assuming you have a user ID stored in the cookies

  const { quantity, size } = req.body;

  try {
    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    // Find the user by their ID and update their cart
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the product is already in the user's cart
    const existCartItem = user.cart.find(
      (item) => item.productId === productId
    );

    if (existCartItem) {
      // Increment the quantity if the product is already in the cart
      existCartItem.quantity = quantity;
      existCartItem.size = size;
    } else {
      // Add the product to the user's cart if it's not there
      user.cart.push({ productId, quantity: quantity, size: size });
    }

    // Save the user's updated cart
    await user.save();
    res.status(200).send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.put("/add-to-cart/:id", async (req, res) => {
//   try {
//     const { user, usrpassword } = req.body;
//     const result = await User.findById(id);
//     console.log(result);
//     const data = result.cart;
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

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

// app.get('/', (req, res) => {
//   // Set session data
//   req.session.username = 'example_user';

//   // Retrieve session data
//   const username = req.session.username;

//   res.send(`Welcome, ${username}!`);
// });

// app.get('/logout', (req, res) => {
//   // Destroy the user's session (log out)
//   req.session.destroy((err) => {
//     if (err) {
//       console.error(err);
//     }
//     res.redirect('/');
//   });
// });
