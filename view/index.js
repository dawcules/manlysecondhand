'use strict';
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const resize = require('../model/utils/resize');
const pass = require('../model/utils/pass');
const query = require('../model/utils/DB_Query');
const fs      = require('fs');
const https   = require('https');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};
//Setting storage to store the files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
}); //Uploading file
const upload = multer({storage: storage}).single('myImages');

app.use(session({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));
app.use(require('serve-static')(__dirname + 'view/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static('view/public'));

app.post('/login', pass.login, (req, res) => {
  res.redirect('http://10.114.32.47/app/userpage.html');
} );
app.post('/register', pass.register, pass.login);

//Handling post form when form is submitted
app.post('/upload', upload,(req, res, err) =>{
    if (err) {
      console.log('Error')
    } else {
      res.send('Upload successful');
      console.log(req.file);
    }
  });

app.get('/', (req, res) => {
  query.insertImage(data, res)
});

app.get('/user', pass.loggedIn, (req, res) => {
  res.redirect('http://10.114.32.47/app/userpage.html');
});



app.use('/image', (req, res, next) => {
    // tee pieni thumbnail
    resize.makeResize(req.file.path, 300, '../uploads/thumbs/' + req.file.filename).
    then(data => {
        next();
    });
});

app.use('/image', (req, res, next) => {
    // tee iso thumbnail
    resize.makeResize(req.file.path, 640, '../uploads/medium/' + req.file.filename).
    then(data => {
        next();
    });
});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic

console.log('Server is starting');
console.log('Rullaa');

