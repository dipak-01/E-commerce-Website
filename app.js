const express = require('express')
const app = express()

app.listen(3000, ()=>{
  console.log('Server Started')
  console.log('Now Listerning to Request')
});

app.use(express.static('public'));


app.use((req, res, next) => {
  console.log('\nNew Request Made :')
  console.log('Host : ',req.hostname);
  console.log('Path : ',req.path);
  console.log('Method : ',req.method);
  next();
})

app.get('/',(req,res)=>{
  res.sendFile('./views/landingPage.html',{root:__dirname});
});

app.get('/user-login',(req,res)=>{
  res.sendFile('./views/login.html',{root:__dirname});
});

app.get('/user-signup',(req,res)=>{
  res.send('<p>Sign up Page</p>')
});

app.get('/about',(req,res)=>{
  res.redirect('/working-on-it')
})

app.use('/working-on-it',(req,res) => {
  res.sendFile('./views/working.html',{root:__dirname});
})
app.use((req,res)=>{
  res.status(404).sendFile('./views/404.html',{root:__dirname});
})
