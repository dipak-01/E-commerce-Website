const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    const result = await user.save();
    res.send("Successfully Signed Up");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
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
};

const logout = async (req, res) => {
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
};

const addToCartOnly = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId; // Assuming you have a user ID stored in the cookies
  console.log(productId);
  console.log(userId);

  try {
    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    // Find the user by their ID and update their cart
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Check if the product is already in the user's cart
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );

    if (existCartItem) {
      // Increment the quantity if the product is already in the cart
      existCartItem.quantity += 1;
    } else {
      // Add the product to the user's cart if it's not there
      user.cart.push({ itemId: productId, quantity: 1, size: 8 });
    }

    // Save the user's updated cart
    await user.save();
    res.status(200).send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId; // Assuming you have a user ID stored in the cookies
  console.log(productId);
  console.log(userId);
  const { quantity, size } = req.body;

  try {
    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    // Find the user by their ID and update their cart
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Check if the product is already in the user's cart
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );

    if (existCartItem) {
      // Increment the quantity if the product is already in the cart
      existCartItem.quantity = quantity;
      existCartItem.size = size;
    } else {
      // Add the product to the user's cart if it's not there
      user.cart.push({ itemId: productId, quantity: quantity, size: size });
    }

    // Save the user's updated cart
    await user.save();
    res.status(200).send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCart = async (req, res) => {
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
};

const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId; // Assuming you have a user ID stored in the cookies

  try {
    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    // Find the user by their ID and update their cart
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the product is already in the user's cart
    const existCartItemIndex = user.cart.findIndex((item) =>
      item.itemId.equals(productId)
    );

    if (existCartItemIndex !== -1) {
      // Remove the product from the cart if it exists
      user.cart.splice(existCartItemIndex, 1);
    } else {
      return res.status(404).send("Product not found in the cart");
    }

    // Save the user's updated cart
    await user.save();
    res.status(200).send("Product removed from cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const addToWishList = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId; // Assuming you have a user ID stored in the cookies
  console.log(productId);
  console.log(userId);

  try {
    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    // Find the user by their ID and update their cart
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }

    // Check if the product is already in the user's wishlist
    const itemExistIndex = user.wishList.findIndex((item) =>
      item.itemId.equals(productId)
    );

    if (itemExistIndex !== -1) {
      // If the product is already in the wishlist, remove it
      user.wishList.splice(itemExistIndex, 1);
      operationMessage = "Product removed from wishlist successfully";
    } else {
      // If the product is not in the wishlist, add it
      user.wishList.push({ itemId: productId, quantity: 1, size: 8 });
      operationMessage = "Product added to wishlist successfully";
    }

    // Save the user's updated wishlist
    await user.save();
    res.status(200).send(operationMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getWishList = async (req, res) => {
  try {
    if (req.cookies.userId) {
      console.log(req.cookies.userId);
      const id = req.cookies.userId;
      console.log("working");
      const user = await User.findById(id);
      console.log(user);
      const data = user.wishList;
      res.send(data);
    } else {
      console.log("cookie not found");
      res.send(req.cookies);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
  addToCartOnly,
  addToCart,
  getCart,
  removeFromCart,
  addToWishList,
  getWishList,
};
