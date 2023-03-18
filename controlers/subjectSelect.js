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
  var user = req.session.user_id;
  console.log('Request Url:' + req.url);
  res.render('StudentDetails');
}


// const query = SELECT * FROM exam_registration_form  where user_id=user;
//     if (user_id) {
//       console.log(user_id, "ifff")
//       res.render("StudentDetails", { msg: "This user id already registered in the data base. In case you wantto change the subject please contact the admin." })
//     } else {
//       connection.query(query, [req.body.level_id], (err, rows, fields) => {
// exports.formsubmitfirst = (req, res) => {
//   var user_id = req.body.user_id;
//   var back1 = req.body.back1;
//   var back2 = req.body.back2;
//   var back3 = req.body.back3;
//   var back = back1 + "," + back2 + "," + back3;
//   var user = req.first_name;
//   var user = req.session.user_id;
//   // var user_id = req.params.user_id;

//   var sql2 = `SELECT * FROM exam_registration_form where user_id = "${user_id}"`;
//     connection.query(sql2, function(error, result2) {
//         console.log(result2.length);
//         if (result2.length >= 0) {
//             res.render("StudentDetails", { msg: "This user id already registered in the data base. In case you wantto change the subject please contact the admin." })
//         }
//     });
//   console.log(user)
//   var sql2 = `SELECT * FROM exam_registration_form where user_id = "${user_id}"`;
//   if (user_id) {
//     console.log(user_id, "ifff")
//     res.render("StudentDetails", { msg: "This user id already registered in the data base. In case you wantto change the subject please contact the admin." })
//   } else {
//     connection.query(query, [req.body.level_id], (err, rows, fields) => {
//       if (!err) {
//         let subjectArray = "";
//         rows.forEach(function (subject) {
//           subjectArray = subject.id + "," + subjectArray;
//         });
//         console.log(subjectArray, "subarray");

//         let sql2 = `INSERT INTO exam_registration_form (user_id, subject_id, back_id) VALUES ('${user_id}', '${subjectArray}' ,'${back}')`;
//         connection.query(sql2, function (err, result) {
//           if (err) throw err;
//           console.log("1 record inserted");
//           res.render('submitstudentdata', result);

//         });
//       }
//       else {
//         return err;
//       }
//     })
//   }
//   console.log(user)
//   console.log('Request Url:' + req.url);
//   // res.render('submitstudentdata');
// }
exports.formsubmitfirst = (req, res) => {
   
  var back1 = req.body.back1;
  var back2 = req.body.back2;
  var back3 = req.body.back3;
  var user_id = req.body.user_id;
  var back = back1 + "," + back2 + "," + back3;
  var user = req.first_name;
  var user = req.session.user_id;
  var sql2 = `SELECT * FROM exam_registration_form where user_id = "${user_id}"`;
  connection.query(sql2, function(error, result2) {
      // console.log(result2.length);
      if (result2.length >= 0) {
        res.render("StudentDetails")
      }
  });
  console.log(user)
  const query = `SELECT * FROM subject  where level_id=?`;
  connection.query(query, [req.body.level_id], (err, rows, fields) => {
      if (!err) {
          let subjectArray = "";
          rows.forEach(function(subject) {

              subjectArray = subject.id + "," + subjectArray;

          });
          console.log(subjectArray);

          let sql2 = `INSERT INTO exam_registration_form (user_id, subject_id, back_id) VALUES ('${user_id}', '${subjectArray}' ,'${back}')`;
          connection.query(sql2, function(err, result) {
              if (err) throw err;
              console.log("1 record inserted");
          });
      } else {
          return err; 
      }
  })

  console.log(user)
  console.log('Request Url:' + req.url);
  res.render('StudentDetails');
}
// 
exports.Subjects = (req, res) => {
  var id = req.body.id;
  var subject = req.body.subject;
  var subject_code = req.body.subject_code;
  var credit_hours = req.body.credit_hours;
  var level_id = req.body.level_id;
  var program_id = req.body.program_id;
  var created_at = Date.now();
  var updated_at = Date.now();
  var sql = "INSERT INTO subject (id,	subject,	subject_code,	 credit_hours, program_id,	level_id, created_at,updated_at) VALUES ('" +
    id + "','" + subject + "','" + subject_code + "','" + credit_hours + "','"
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



exports.editForm = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM exam_registration_form WHERE user_id = ?', [req.params.user_id], (err, rows) => {
    if (!err) {
      res.render('submitstudentdata', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
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
// exports.card = (req, res) => {
//   res.render("admitcard");
// }
// exports.admitCard = (req, res) => {
//   var level_id = req.body.level_id;

//   connection.query('SELECT * FROM subject WHERE level_id = ?', [req.body.level_id],
//     (err, rows) => {
//       // When done with the connection, release it
//       if (!err) {
//         console.log(level_id, "hell1o")
//         res.render('admitcard', { rows, alert: `${level_id} has been updated.` });
//       } else {
//         console.log(err, "i am error");
//       }
//       console.log("hlo hlo")
//       console.log('The data from user table: \n', rows);
//     });

// }
