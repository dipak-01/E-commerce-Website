const User = require("./models/userModel");
const Product = require("./models/productModel");
const connectDb = require("./config/dbconnect");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");

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

const secretKey = crypto.randomBytes(64).toString("hex");

app.use(cookieParser());

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use(express.json()),
  app.use(
    session({
      secret: secretKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure:true,
        sameSite : 'none' ,
     },
    })
  );

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

app.post("/user-login", async (req, res) => {
  try {
    console.log(req.session);
    console.log(req.body);
    const { usremail, usrpassword } = req.body;
    const user = await User.findOne({ email: usremail });
    const passwordmatch = user.password == usrpassword;
    if (passwordmatch) {
      console.log(req.session.userId);
      if (req.session.userId) {
        console.log("User is Already logged In...");
        res.send(req.session.userId);
      } else {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        req.session.i = user._id;
        console.log("Cookie Stored : " + req.session.i);
        console.log("User Successfully Logged In...");
        console.log(req.session);
        res.send(req.session);
      }
    } else {
      res.status(401).send("Invalid Username or Password!!!");
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

app.post("/user-logout", async (req, res) => {
  try {
    if (req.session.userId) {
      // User is logged in, so we can proceed with logging them out
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error occurred during logout");
        } else {
          res.clearCookie("connect.sid");
          console.log("Cookie Cleared");
          res.send("Successfully Logged Out");
        }
      });
    } else {
      // User is not logged in
      res.status(401).send("User Not logged In");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

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
    if (req.session.userId) {
      console.log(req.session.userId);
      const id = req.session.userId;
      console.log("working");
      const result = await User.findById(id);
      console.log(result);
      const data = result.cart;
      res.send(data);
    } else {
      console.log("cookie not found");
      res.send(req.session);
    }
  } catch (err) {
    console.log(err);
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
