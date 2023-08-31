const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const connectDb = require ('./config/dbconnect')
const User = require('./models/userModel');
const Product = require('./models/productModel');
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`\nServer Started...\nSuccessfully Connected to Database...\nListening to Requests at Port: ${port}`);
    });
  })
  .catch((err) => {
    console.console(err);
  });

app.use(cors())
app.use(express.urlencoded({extended: true}),express.json(),express.static('public')) ;

app.use((req, res, next) => {
  console.log('\nNew Request Made :')
  console.log('Host : ',req.hostname);
  console.log('Path : ',req.path);
  console.log('Method : ',req.method);
  next();
})

app.post('/user-signup',( req, res ) => {
  console.log(req.body)
  const user = new User(req.body)
  user.save()
    .then((result) => {
      res.redirect('/home')
    })
    .catch((err) => {
      console.log(err);
    })
});

app.post('/add-product',( req, res ) => {
  console.log(req.body)
  const product = new Product(req.body)
  product.save()
    .then((result) => {
      res.redirect('/add-product')
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/product/:id',(req,res) => {
  const id = req.params.id;
  Product.findById(id)
  .then((result) => {
    res.send(result); 
  })
  .catch((err) => {
    console.log(err);
  });
})

app.get('/explore-all',(req,res) => {
  Product.find()
  .then((result) => {
    res.send(result); 
  })
  .catch((err) => {
    console.log(err);
  });
})