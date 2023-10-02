const express = require("express");
const app = express();
const userRoutes = require("../backend/routes/userRoutes");
const productRoutes = require("../backend/routes/productRoutes");
const paymentRoutes = require("../backend/routes/paymentRoutes");
const connectDb = require("./config/dbconnect");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use(paymentRoutes);
