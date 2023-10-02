// Required Models Imported
const User = require("../models/userModel");
const Product = require("../models/productModel");

// Asynchronous function to get status if User is Logged In
const status = async (req, res) => {
  try {
    // If user is present then continue else send resopnse with 404 status code
    if (req.cookies.userId) {
      // Searching User By UserId
      const user = await User.findById(req.cookies.userId);

      // Creating data for Response
      const data = {
        status: true,
        avatarUrl: user.avatarUrl,
      };
      let result = JSON.stringify(data);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(result);
    } else {
      const data = {
        status: false,
        avatarUrl: null,
      };
      let result = JSON.stringify(data);
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(result);
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to SignUp User
const signup = async (req, res) => {
  try {
    // Array of Avatar Url
    let avatarUrl = [
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735476621373/5937171-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735715684454/5937172-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735942180864/5937173-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736130932878/5937174-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736378384426/5937175-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736634241054/5937176-removebg-preview.png",
    ];

    // Random Number Generating Function
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomIndex = getRandomInt(0, avatarUrl.length - 1);
    const randomLink = avatarUrl[randomIndex];

    // Creating User Object
    const user = new User(req.body);
    user.avatarUrl = randomLink;
    user.addrs1 = "Address 1";
    user.addrs2 = "Address 2";

    // Waiting for User to get Saved in Database
    await user.save();
    res.status(201).send("Successfully Signed Up");
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Login User
const login = async (req, res) => {
  try {
    // Extracting Data from Request
    const { usremail, usrpassword } = req.body;

    // Searching User in Database using Email
    const user = await User.findOne({ email: usremail });

    // Checking if Password are Same
    const passwordmatch = user.password == usrpassword;

    // If Password Matches then Set Cookies else Send Response with 401 status code
    if (passwordmatch) {
      // If Cookies are already Present then don't Set Cookies else Set Cookies
      if (req.cookies.userId) {
        res.status(200).json({ message: "Already Logged In" });
      } else {
        res.cookie("userId", user._id, {
          httpOnly: false,
          sameSite: "None",
          secure: true,
        });
        res.status(200).json({ message: "Successfully Logged In" });
      }
    } else {
      res.status(401).json({ message: "Invalid Username or Password!!!" });
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Logout User
const logout = async (req, res) => {
  try {
    // If user is present then Clear Cookies else send resopnse with 400 Status Code
    if (req.cookies.userId) {
      res.clearCookie("userId", {
        httpOnly: false,
        sameSite: "None",
        secure: true,
      });
      res.status(200).send("Successfully Logged Out");
    } else {
      res.status(400).json({ message: "User Not logged In" });
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Asynchronous function to Add to Cart Only
const addToCartOnly = async (req, res) => {
  // Extracting Data From Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;

  try {
    // Searching User in Database using userId
    const user = await User.findById(userId);

    // If User not found then Send Response with 404  Status Code
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Checking If Product Exist in  User Cart
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );

    // If Product Exist in Cart then Quantity + 1 else Push Product in User Cart Array
    if (existCartItem) {
      existCartItem.quantity += 1;
    } else {
      user.cart.push({ itemId: productId, quantity: 1, size: 8 });
    }

    // Waiting to get Saved in Database
    await user.save();
    res.status(201).send("Product added to cart successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Add to Cart Only
const addToCart = async (req, res) => {
  // Extracting Data From Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  const { quantity, size } = req.body;

  try {
    // Searching User in Database using userId
    const user = await User.findById(userId);

    // If User not found then Send Response with 404  Status Code
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Checking If Product Exist in  User Cart
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );

    // If Product Exist in Cart then update Quantity else Push Product in User Cart Array
    if (existCartItem) {
      existCartItem.quantity = quantity;
      existCartItem.size = size;
    } else {
      user.cart.push({ itemId: productId, quantity: quantity, size: size });
    }

    // Waiting to get Saved in Database
    await user.save();
    res.status(201).send("Product added to cart successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get User Cart
const getCart = async (req, res) => {
  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      const id = req.cookies.userId;

      // Searching User in Database and Extracting its Cart
      const result = await User.findById(id);
      const data = result.cart;
      res.status(200).send(data);
    } else {
      res.status(400).send("Please Login");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Remove Product from User Cart
const removeFromCart = async (req, res) => {
  // Extracting Data from Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;

  try {
    // Searching User in Database
    const user = await User.findById(userId);

    // If User not found then Send Response with 404  Status Code
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Searching for Index
    const existCartItemIndex = user.cart.findIndex((item) =>
      item.itemId.equals(productId)
    );

    // If Product Exist in Cart then Remove it else Send Response with 404 Status Code
    if (existCartItemIndex !== -1) {
      user.cart.splice(existCartItemIndex, 1);
    } else {
      return res.status(404).send("Product not found in the cart");
    }

    // Waiting to get Saved in Database
    await user.save();
    res.status(200).send("Product removed from cart successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get Total Amount To Pay
const totalamount = async (req, res) => {
  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      // Extracting Data from Request
      const id = req.cookies.userId;
      const user = await User.findById(id);
      const cart = user.cart;

      // Calculating Total Amount
      let currentid;
      let currentamount;
      let tamount = 0;
      for (let i = 0; i < cart.length; i++) {
        currentid = cart[i].itemId;
        const currentproduct = await Product.findById(currentid);
        currentamount = currentproduct.price;
        tamount = tamount + cart[i].quantity * currentamount;
      }
      res.status(200).send(`${tamount}`);
    } else {
      res.status(400).send(tamount);
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Add Product to Wishlist
const addToWishList = async (req, res) => {
  // Extracting Data from Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  try {
    // Searching User By UserId
    const user = await User.findById(userId);

    // If User not found then Send Response with 404  Status Code
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Checking If Product Exist in User Wishlist
    const itemExistIndex = user.wishList.findIndex((item) =>
      item.itemId.equals(productId)
    );

    // If Product Exist in Wishlist then remove it else Push Product in Wishlist Array
    if (itemExistIndex !== -1) {
      user.wishList.splice(itemExistIndex, 1);
      operationMessage = "Product removed from wishlist successfully";
    } else {
      user.wishList.push({ itemId: productId, quantity: 1, size: 8 });
    }

    // Waiting to get Saved in Database
    await user.save();
    res.status(200).send("Product added to wishlist successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get Wishlist
const getWishList = async (req, res) => {
  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      const id = req.cookies.userId;
      const user = await User.findById(id);
      const data = user.wishList;
      res.status(200).send(data);
    } else {
      res.status(400).send("Please Login");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Remove Product from Wishlist
const removeFromWishList = async (req, res) => {
  // Extracting Data from Request
  const productId = req.params.productId;
  const userId = req.cookies.userId;

  try {
    // Searching User in Database
    const user = await User.findById(userId);

    // If User not found then Send Response with 404  Status Code
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Searching for Index
    const existItemIndex = user.wishList.findIndex((item) =>
      item.itemId.equals(productId)
    );

    // If Product Exist in Wishlist then Remove it else Send Response with 404 Status Code
    if (existItemIndex !== -1) {
      user.wishList.splice(existItemIndex, 1);
    } else {
      return res.status(404).send("Product not found in the Wishlist");
    }

    // Waiting to get Saved in Database
    await user.save();
    res.status(200).send("Product removed from Wishlist successfully");
  } catch (err) {
    // In Case of Error in Handling Request
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to View Profile of User
const viewprofile = async (req, res) => {
  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      // Searching User in Database
      const user = await User.findById(req.cookies.userId);
      res.status(200).send(user);
    } else {
      res.status(400).json({ message: "Please Login..." });
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Delete User Account
const deleteUser = async (req, res) => {
  // Extracting Data from Request
  const userId = req.cookies.userId;

  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      const deletedUser = await User.findOneAndDelete({ _id: userId });

      // If User is Deleted then Clear Cookies
      if (deletedUser) {
        res.clearCookie("userId", {
          httpOnly: false,
          sameSite: "None",
          secure: true,
        });
        res.status(200).send("Account Deleted !");
      } else {
        res.status(400).send("User not found");
      }
    } else {
      res.status(400).send("Please Login First...");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Update User Details
const update = async (req, res) => {
  // Extracting  Data from request
  const userId = req.cookies.userId;
  const { firstName, lastName, addrs1, addrs2, password } = req.body;

  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      // Searching User in Database
      const user = await User.findById(userId);
      // If User is Found then Update Details else Responde with 404 Status Code
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.addrs1 = addrs1;
        user.addrs2 = addrs2;
        user.password = password;
        await user.save();
        res.status(200).send("Details Updated");
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Please Login First...");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Clear Cart
const clearCart = async (req, res) => {
  try {
    // Extracting Data from Request
    const userId = req.cookies.userId;

    // Searching User in Database
    const user = await User.findById(userId);

    // Set Order Placed Array to Cart Array and Set Orignal Cart Array to Empty
    user.orderPlaced = user.cart;
    user.cart = [];

    // Waiting to get Saved in Database
    await user.save();
    res.status(200).send("Cart Cleared");
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to Get Order Placed Array
const orderPlaced = async (req, res) => {
  try {
    // If User is Present then Continue else Send Resopnse with 400 Status Code
    if (req.cookies.userId) {
      const id = req.cookies.userId;

      // Searching User in Database and Extracting Order Placed Array
      const result = await User.findById(id);
      const data = result.orderPlaced;
      res.status(200).send(data);
    } else {
      res(400).send("Bad Request");
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Asynchronous function to View Details of Specific User
const view = async (req, res) => {
  try {
    // If User Id is present In Request Parameters then continue else Responde with 400 Status code
    if (req.params.userId) {
      const user = await User.findById(req.params.userId);
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "Please Login..." });
    }
  } catch (err) {
    // In Case of Error in Handling Request
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Exporting all Functions
module.exports = {
  status,
  signup,
  login,
  logout,
  addToCartOnly,
  addToCart,
  getCart,
  removeFromCart,
  totalamount,
  addToWishList,
  getWishList,
  removeFromWishList,
  viewprofile,
  deleteUser,
  update,
  clearCart,
  orderPlaced,
  view,
};
