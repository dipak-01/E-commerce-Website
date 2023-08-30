const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const connectDb = require ('./config/dbconnect')
const User = require('./models/userModel');
const Product = require('./models/productModel');

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


app.use(express.urlencoded({extended: true}),express.json(),express.static('public')) ;


app.use((req, res, next) => {
  console.log('\nNew Request Made :')
  console.log('Host : ',req.hostname);
  console.log('Path : ',req.path);
  console.log('Method : ',req.method);
  next();
})

app.get('/',(req,res)=>{
  res.sendFile('./views/index.html',{root:__dirname});
});

app.get('/home',(req,res)=>{
  res.sendFile('./views/landingPage.html',{root:__dirname});
});

app.get('/user-login',(req,res)=>{
  res.sendFile('./views/login.html',{root:__dirname});
});

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

app.get('/add-product',(req,res)=>{
  res.sendFile('./views/add_product.html',{root:__dirname});
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

app.get('/allproducts',(req,res)=>{
  res.sendFile('./views/exploreAll.html',{root:__dirname});
});
app.get('/product-details',(req,res)=>{
  res.sendFile('./views/product.html',{root:__dirname});
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

app.get('/about',(req,res)=>{
  res.sendFile('./views/contact.html',{root:__dirname})
})

app.get('/privacy-policy',(req,res)=>{
  res.sendFile('./views/Privacy-Policy.html',{root:__dirname});
});

app.get('/terms',(req,res)=>{
  res.sendFile('./views/Terms.html',{root:__dirname});
});

app.use('/working-on-it',(req,res) => {
  res.sendFile('./views/working.html',{root:__dirname});
})
app.use((req,res)=>{
  res.status(404).sendFile('./views/404.html',{root:__dirname});
})
