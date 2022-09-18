const express = require('express');
const router = require('./routes/route');
const {exphbs, engine}=require("express-handlebars");
const app = express();
const mysql = require('mysql');
const bodyParser=require("body-parser");

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



app.use(fileUpload());
app.use(express.static('upload'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


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
