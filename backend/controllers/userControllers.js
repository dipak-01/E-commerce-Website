const User = require("../models/userModel");
const Product = require("../models/productModel");

const status = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const user = await User.findById(req.cookies.userId);
      const data = {
        status: true,
        avatarUrl: user.avatarUrl,
      };
      let result = JSON.stringify(data);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(result);
    } else {
      console.log("cookie not found");
      const data = {
        status: false,
        avatarUrl: null,
      };
      let result = JSON.stringify(data);
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const signup = async (req, res) => {
  try {
    console.log(req.body);
    let avatarUrl = [
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735476621373/5937171-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735715684454/5937172-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537735942180864/5937173-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736130932878/5937174-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736378384426/5937175-removebg-preview.png",
      "https://cdn.discordapp.com/attachments/1142746103029174274/1150537736634241054/5937176-removebg-preview.png",
    ];
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomIndex = getRandomInt(0, avatarUrl.length - 1);
    const randomLink = avatarUrl[randomIndex];
    const user = new User(req.body);
    user.avatarUrl = randomLink;
    user.addrs1 = "Address 1";
    user.addrs2 = "Address 2";
    await user.save();
    res.status(201).send("Successfully Signed Up");
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
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  try {
    if (req.cookies.userId) {
      res.clearCookie("userId", {
        httpOnly: false,
        sameSite: "None",
        secure: true,
      });
      console.log("Cookie Cleared");
      res.status(200).send("Successfully Logged Out");
    } else {
      res.status(401).json({ message: "User Not logged In" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToCartOnly = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );
    if (existCartItem) {
      existCartItem.quantity += 1;
    } else {
      user.cart.push({ itemId: productId, quantity: 1, size: 8 });
    }
    await user.save();
    res.status(201).send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  const { quantity, size } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }
    const existCartItem = user.cart.find((item) =>
      item.itemId.equals(productId)
    );
    if (existCartItem) {
      existCartItem.quantity = quantity;
      existCartItem.size = size;
    } else {
      user.cart.push({ itemId: productId, quantity: quantity, size: size });
    }
    await user.save();
    res.status(201).send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCart = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const id = req.cookies.userId;
      const result = await User.findById(id);
      const data = result.cart;
      res.status(200).send(data);
    } else {
      res.status(400).send("Please Login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const existCartItemIndex = user.cart.findIndex((item) =>
      item.itemId.equals(productId)
    );
    if (existCartItemIndex !== -1) {
      user.cart.splice(existCartItemIndex, 1);
    } else {
      return res.status(404).send("Product not found in the cart");
    }
    await user.save();
    res.status(200).send("Product removed from cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const totalamount = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const id = req.cookies.userId;
      const user = await User.findById(id);
      const cart = user.cart;
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
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const addToWishList = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found. Please Login");
    }
    const itemExistIndex = user.wishList.findIndex((item) =>
      item.itemId.equals(productId)
    );

    if (itemExistIndex !== -1) {
      user.wishList.splice(itemExistIndex, 1);
      operationMessage = "Product removed from wishlist successfully";
    } else {
      user.wishList.push({ itemId: productId, quantity: 1, size: 8 });
    }
    await user.save();
    res.status(200).send("Product added to wishlist successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getWishList = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const id = req.cookies.userId;
      const user = await User.findById(id);
      const data = user.wishList;
      res.status(200).send(data);
    } else {
      res.status(404).send("Please Login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const removeFromWishList = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.cookies.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const existItemIndex = user.wishList.findIndex((item) =>
      item.itemId.equals(productId)
    );
    if (existItemIndex !== -1) {
      user.wishList.splice(existItemIndex, 1);
    } else {
      return res.status(404).send("Product not found in the Wishlist");
    }
    await user.save();
    res.status(200).send("Product removed from Wishlist successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewprofile = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const user = await User.findById(req.cookies.userId);
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "Please Login..." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.cookies.userId;
  try {
    if (req.cookies.userId) {
      const deletedUser = await User.findOneAndDelete({ _id: userId });
      if (deletedUser) {
        res.clearCookie("userId", {
          httpOnly: false,
          sameSite: "None",
          secure: true,
        });
        res.status(200).send("Account Deleted !");
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Please Login First...");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  const userId = req.cookies.userId;
  const { firstName, lastName, addrs1, addrs2, password } = req.body;
  try {
    if (req.cookies.userId) {
      const user = await User.findById(userId);
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
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const user = await User.findById(userId);
    user.orderPlaced = user.cart;
    user.cart = [];
    await user.save();
    res.status(200).send("Cart Cleared");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const orderPlaced = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const id = req.cookies.userId;
      const result = await User.findById(id);
      const data = result.orderPlaced;
      res.status(200).send(data);
    } else {
      res(400).send("Bad Request");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const view = async (req, res) => {
  try {
    if (req.params.userId) {
      const user = await User.findById(req.params.userId);
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "Please Login..." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

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
