const express = require("express");
const app = express();
const userRoutes = require("../backend/routes/userRoutes");
const productRoutes = require("../backend/routes/productRoutes");
const connectDb = require("./config/dbconnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const startServer = async () => {
  if (await connectDb()) {
    try {
      app.listen(port, () => {
        console.log(
          `\nSuccessfully Connected to Database...\nListening to Requests at Port: ${port}\nServer Started...`
        );
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Server Error");
  }
};

startServer();
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.use(cookieParser());
app.use(express.json()), app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("\nNew Request Made :");
  console.log("Host : ", req.hostname);
  console.log("Path : ", req.path);
  console.log("Method : ", req.method);
  next();
});

app.use(userRoutes);
app.use(productRoutes);










































































































// app.use(express.static("public"));

// app.use((req,res,next)=>{
//   if(req.session.user){next()}
//   else{
//     res.status(401).send("Please Login!!!")
//   }
// })

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
