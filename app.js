const express = require('express')
const app = express()

app.listen(3000, ()=>{
  console.log('Server Started')
  console.log('Now Listerning to Request')
});

app.get('/',(req,res)=>{
  res.send('<p>UpStyle Homepage</p>');
});

app.get('/user-login',(req,res)=>{
  res.send('<p>Login page</p>')
});

app.get('/user-signup',(req,res)=>{
  res.send('<p> Sign up Page</p>')
});