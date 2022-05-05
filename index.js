require('dotenv').config();
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require('cookie-parser');

const User = require('./models/user');
const mongoose = require('mongoose');
const emailFunction = require('./utils/email');

const ejs = require('ejs');
const res = require('express/lib/response');
const { find } = require('./models/user');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['secret 1', 'secret 2'],

  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   console.log(req.cookies);
//   next();
// })

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
    next();
  } else {
    res.locals.user = undefined;
    next();
  }
})

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const isLogged = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      'error': 'you must login'
    })
  }
}


app.get('/', function (req, res) {
  res.render('main',{title:'Home'});
})

app.get('/register', function (req, res) {
  res.render('login', { title: 'register' });

})

app.post('/register', async function (req, res) {
  console.log(req.body);

  const user = await User.register({ email: req.body.email }, req.body.password);

  if (user) {
    res.json({
      user
    })
  } else {
    res.json({
      'error': 'cannot create user'
    })
  }
})

app.get('/login', function (req, res) {
  res.render('login', { title: 'login' });
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
  console.log("entered");
  res.redirect('/secret')
})


app.get('/secret', isLogged, function (req, res) {
  res.send('this is secret')
})

app.get('/changePassword', isLogged, function (req, res) {
  res.render('change', { title: 'reset password' });
})

app.post('/changePassword', isLogged, async function (req, res) {
  
  const user = await User.findByUsername(req.user.email);
  await user.changePassword(req.body.oldPassword, req.body.newPassword);
  req.logout();

res.json({
  result: 'success'
})
})

app.get('/forgotPassword',function(req,res){
  res.render('forgot',{title:'forgot'});
})


app.post('/forgotPassword',async function(req,res){
  console.log(req.body);
  const user = await User.findByUsername(req.body.email);
  const resetToken = user.createResetToken();
  console.log(user);
  console.log(resetToken);
  await user.save();
  await emailFunction(user.email,resetToken);
  res.json({
    result: 'success',
    message: `An email with reset information has been send to your registered email id: ${user.email}`
    
  })
})

app.get('/resetPassword/:q',async function(req,res){
  try {
    
    const enc = crypto.createHash('sha256').update(req.params.q).digest('hex');
    

    const [user] = await User.find({resetToken:enc});
   
    if(!user){
      throw new Error('user not exists')
    }
    res.render('reset',{title:'reset password'});
  } catch (error) {
    console.log(error);
  }

})

app.patch('/resetPassword/:q',async function(req,res){
  try {
    console.log(req.body);
    const enc = crypto.createHash('sha256').update(req.params.q).digest('hex');
    const [user] = await User.find({resetToken:enc});
    await user.setPassword(req.body.newPassword);
    await user.save();
    // console.log(user);
    res.status(200).json({
      result:'success',
      message: `password changed for ${user.email} `
    })
  } catch (error) {
    console.log(error);
  }

})


app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => console.log('connected'))

const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}, app);

server.listen(8000, () => {
  console.log('listening on 8000');
})