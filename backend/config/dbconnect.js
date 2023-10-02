const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();//This brings environment variable into runtime environment

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.URI);
    console.log(
      "\nMongoDb Connected: ",
      connect.connection.host,
      connect.connection.name
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = connectDb;
