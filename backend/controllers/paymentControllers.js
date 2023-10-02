const Razorpay = require("razorpay");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();
const RPAYIDK = process.env.RPAYIDK;
const RPAYSK = process.env.RPAYSK;

const instance = new Razorpay({
  key_id: RPAYIDK,
  key_secret: RPAYSK,
});
const createOrder = async (req, res) => {
  try {
    if (req.cookies.userId) {
      const userId = req.cookies.userId;
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
    console.log(error.message);
  }
};

module.exports = {
  createOrder,
};
