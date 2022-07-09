const express = require('express');
const router = require('./routes/route');
const {exphbs, engine}=require("express-handlebars");
const app = express();
const mysql = require('mysql');
const bodyParser=require("body-parser");
 const multer = require('multer')

const fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const path = require('path');
const session = require('express-session');
const cookieParser=require('cookie-parser')
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"user"
});
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// default option
//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});
//route for Home page
// app.get('/', (req, res) => {
//   res.render('add-user');

//   // res.sendFile(__dirname + '/views/user-form');
// });
 
// app.post("/post", upload.single('image'), (req, res) => {
//   if (!req.file) {
//       console.log("No file upload");
//   } else {
//       console.log("heloo2",req.file.filename)
//       var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
//       var insertData = "INSERT INTO user(file_src)VALUES(?)"
//       db.query(insertData, [imgsrc], (err, result) => {
//           if (err) throw err
//           console.log("file uploaded")
//       })
//   }
// });


app.use(fileUpload());
app.use(express.static('upload'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// hbs.registerPartial(path.join(__dirname,'views'),err=>{})

// app.get('/', getDetails);
app.engine('.hbs', engine({
  defaultLayout: 'main', 
  extname: '.hbs',
  layoutsDir:'views/layouts',
  partialsDir:'views/partials'
}));
app.set('view engine', '.hbs');

console.log("hello")

app.use('/', router)
app.use('/student', router)

const port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log(`I am listening in port ${port}`);
})
