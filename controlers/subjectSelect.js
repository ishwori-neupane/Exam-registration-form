const mysql = require("mysql");
const path = require('path');
var bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const sendToken = require("../utils/jwtWebToken");
const connection = mysql.createConnection({
  database: "user",
  host: "localhost",
  user: "root",
  password: ""
})


const session = require('express-session');

exports.Subjectsform = (req, res) => {
  // console.log(req.session.user_id, 'dfgzdx');

  var user = req.session.user_id;
  // console.log(user)
  console.log('Request Url:' + req.url);
  res.render('StudentDetails');

}
exports.formsubmitfirst = (req, res) => {
   var user_id=req.params.user_id;
  var back1 = req.body.back1;
  var back2 = req.body.back2;
  var back3 = req.body.back3;
  var back = back1 + "," + back2 + "," + back3;

  
  var user = req.first_name;
  // console.log(req);
  var user = req.session.user_id;
  console.log(user)
  const query = `SELECT * FROM subject  where level_id=?`;
  connection.query(query, [req.body.level_id], (err, rows, fields) => {
    if (!err) {
      let subjectArray = "";
      rows.forEach(function (subject) {

        subjectArray = subject.id + "," + subjectArray;

      });
      console.log(subjectArray);

      let sql2 = `INSERT INTO exam_registration_form (user_id, subject_id, back_id) VALUES ('${user_id}', '${subjectArray}' ,'${back}')`;
      connection.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted"); 
      });
    }
    else {
      return err;
    }
  })

  console.log(user)
  console.log('Request Url:' + req.url);
  res.render('StudentDetails');

}

// exports.admitCard = (req, res) => {
//   const query = `SELECT * FROM exam_registration_form where user_id=?`;
//   console.log("hekk",req.params.id)
//   connection.query("SELECT * FROM exam_registration_form WHERE user_id=?", req.params.id,function(error, rows,fields) {
//     if (!error) {
//       console.log(req.params.id,"tygtrxctryctdx")
//       res.render("admitcard", {rows});
//     }else{
//       console.log(error)
//     }
//     console.log("hello i am admit card", rows)
//   })

//   let sql2 = `SELECT * FROM user`;



// }

exports.Subjects = (req, res) => {
  var id = req.body.id;
  var subject = req.body.subject;
  var subject_code = req.body.subject_code;
  var barrier_id = req.body.barrier_id;
  var concorrent_id = req.body.concorrent_id;
  var credit_hours = req.body.credit_hours;
  var level_id = req.body.level_id;
  var program_id = req.body.program_id;
  var created_at = Date.now();
  var updated_at = Date.now();
  var sql = "INSERT INTO subject (id,	subject,	subject_code,	barrier_id,	concorrent_id, credit_hours, program_id,	level_id, created_at,updated_at) VALUES ('" +
    id + "','" + subject + "','" + subject_code + "','" + barrier_id + "','" + concorrent_id + "','" + credit_hours + "','"
    + program_id + "','" + level_id + "','" + created_at + "','" + updated_at + "')";
  connection.query(sql, (error, rows, fields) => {
    if (!error) {
      res.render('StudentDetails', { alert: 'Form filled successfully.' });

    }
    else {
      console.log(error);
    }
    console.log('The data from user table: \n', rows);
  })

}


exports.SubjectSubmit = (req, res) => {
  var level_id = req.body.level_id;

  connection.query('SELECT * FROM subject WHERE level_id = ?', [req.body.level_id], (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      console.log(level_id, "hello")
      res.render('submitstudentdata', { rows, alert: `${level_id} has been updated.` });
    } else {
      console.log(err, "i am error");
    }
    console.log("hlo hlo")
    console.log('The data from user table: \n', rows);
  });

}
exports.card=(req,res)=>{
  res.render("admitcard");
}
exports.admitCard = (req, res) => {
  var level_id = req.body.level_id;

  connection.query('SELECT * FROM subject WHERE level_id = ?', [req.body.level_id],
   (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      console.log(level_id, "hell1o")
      res.render('admitcard', { rows, alert: `${level_id} has been updated.` });
    } else {
      console.log(err, "i am error");
    }
    console.log("hlo hlo")
    console.log('The data from user table: \n', rows);
  });

}