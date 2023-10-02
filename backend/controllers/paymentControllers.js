// Required Librarys and Models Imported
const Razorpay = require("razorpay");
const User = require("../models/userModel");
const dotenv = require("dotenv");

// Brings Environment Variable form .env file into Runtime Environment
dotenv.config();

// Getting Razorpay Keys from Environment Variables
const RPAYIDK = process.env.RPAYIDK;
const RPAYSK = process.env.RPAYSK;

// Creating Instance of Razorpay
const instance = new Razorpay({
  key_id: RPAYIDK,
  key_secret: RPAYSK,
});

// Asynchronous function to Create Order
const createOrder = async (req, res) => {
  try {
    // If user is present then continue else send resopnse with 400 status code
    if (req.cookies.userId) {
      const userId = req.cookies.userId;

      // Finding user in Database
      const user = await User.findById(userId);
      const name = user.firstName + "" + user.lastName;
      const phone = user.phone;
      const email = user.email;
      const amount = req.body.amount * 100;
      const options = {
        amount: amount,
        currency: "INR",
        receipt: "Test_Receipt",
      };

      // Creating order using Razorpay Instance
      instance.orders.create(options, (err, order) => {
        if (!err) {
          res.status(200).send({
            success: true,
            msg: "Order Created",
            orderId: order.id,
            amount: amount,
            key_id: RPAYIDK,
            product_name: req.body.name,
            description: req.body.description,
            contact: phone,
            name: name,
            email: email,
          });
        } else {
          // In Case of Error in Creating Order
          res
            .status(400)
            .send({ success: false, msg: "Something went wrong!" });
        }
      });
    } else {
      console.log("cookie not found");
      res.status(404).send("Please Login!!!");
    }
  } catch (error) {
    // In Case of Error in Handling Request
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Export creteOrder function
module.exports = {
  createOrder,
};
