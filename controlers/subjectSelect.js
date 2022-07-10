const mysql = require("mysql");
// const session = require('express-session');
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
    console.log(req.session.user_id, 'dfgzdx');

    var user = req.session.user_id;
    console.log(user)
    console.log('Request Url:' + req.url);
    res.render('StudentDetails');

}

exports.formsubmitfirst = (req, res) => {
    console.log(req.session.user_id, 'dfgzdx');

    var user = req.first_name;
    console.log(req);
    // exit();
    // console.log('Request Url:' + req.url);
    // res.render('StudentDetails');

}

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
        id + "','" + subject + "','" + subject_code + "','" + barrier_id + "','" + concorrent_id + "','" + credit_hours + "','" +
        program_id + "','" + level_id + "','" + created_at + "','" + updated_at + "')";
    connection.query(sql, (error, rows, fields) => {
        if (!error) {
            res.render('StudentDetails', { alert: 'Form filled successfully.' });

        } else {
            console.log(error);
        }
        console.log('The data from user table: \n', rows);
    })

}

exports.SubjectSubmit = (req, res) => {

    // var id = req.body.id;
    // var subject = req.body.subject;
    // var subject_code = req.body.subject_code;
    // var barrier_id = req.body.barrier_id;
    // var concorrent_id = req.body.concorrent_id;
    // var credit_hours = req.body.credit_hours;
    var level_id = req.body.level_id;
    // var program_id = req.body.program_id;
    // var created_at = Date.now()
    // console.log(created_at)
    // aba yesma frontend ko form bata aako  program id ra level id chainxa
    // var updated_at = Date.now();
    // var sql = `SELECT * FROM subject WHERE level_id =${req.body.level_id}` ;
    // console.log(req.session.user_id, "hello")
    // console.log(sql)
    // connection.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log(result);
    //       console.log("hi")
    //       res.render("contact")
    //     })
    connection.query('SELECT * FROM subject WHERE level_id = ?', [req.body.level_id], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            console.log(level_id, "hello")
            res.render('contact', { rows, alert: `${level_id} has been updated.` });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
    // console.log(level_id)
    // if (level_id === 1) {
    //   var sql = "SELECT Semester,Exam_Roll_number  FROM user JOIN subject ON subject.level_id = user.Semester";
    //   console.log(level_id)
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     console.log("hi")
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 2) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 3) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 4) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 5) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 6) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 7) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // else if (level_id === 8) {
    //   var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.render("contact")
    //   })
    // }
    // var sql = "SELECT Semester,Exam_Roll_number FROM user JOIN subject ON subject.level_id = user.Semester";
    // connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   res.render("contact")
    // });


}