const mysql = require("mysql");
const session = require('express-session');
const path = require('path');
var bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const sendToken = require("../utils/jwtWebToken");
const { exit } = require("process");

const connection = mysql.createConnection({
    database: "user",
    host: "localhost",
    user: "root",
    password: ""
})

// View Users
exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM users WHERE status = "active"',
        (err, rows) => {
            // When done with the connection, release it
            if (!err) {
                let removedUser = req.query.removed;
                res.render('index', { rows, removedUser });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
}

exports.profile = function (req, res) {

    var message = '';
    var id = req.params.id;
    var sql = "SELECT * FROM `users` WHERE `id`='" + id + "'";
    connection.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Profile not found!";

        res.render('add-user', { data: result, message: message });
    });
};
exports.create = async (req, res) => {
    // exit();
    check('username', 'Username field cannot be empty.').notEmpty();
    check('username', 'Username must be between 4-15 characters long.').isLength({ min: 5 });
    check('email', 'The email you entered is invalid, please try again.').isEmail();
    check('email', 'Email address must be between 4-100 characters long, please try again.').isLength({ min: 5 });
    check('password', 'Password must be between 8-100 characters long.').isLength({ min: 8 });
    check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    check('confirmedPassword', 'Password must be between 8-100 characters long.').isLength({ min: 8 });
    check('confirmedPassword', 'Passwords do not match, please try again.').equals(req.body.password);

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    check('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    // const { first_name, last_name, email, phone, comments } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var Exam_Roll_number = req.body.Exam_Roll_number;
    var PU_Registration_num = req.body.PU_Registration_num;
    var level = req.body.level;
    var phone = req.body.phone;
    var Program = req.body.Program;
    var Semester = req.body.Semester;
    var year = req.body.year;
    var file_src = req.body.file_src;
    var id = req.body.id;
    var status = req.body.status
    var password = req.body.password;
    // var confirmedPassword=req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)

    let searchTerm = req.body.search;
    if (!req.files)
                return res.status(400).send('No files were uploaded.');
        var file = req.files.uploaded_image;
        var img_name=file.name;
    
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
            file.mv('public/images/upload_images/'+file.name, function(err) {
                           
                if (err)
                  return res.status(500).send(err);
            // User the connection
            var sql = "INSERT INTO users (id, first_name, last_name, email, phone, password, status,  Exam_Roll_number, PU_Registration_num, level, Program, Semester, year,file_src) VALUES ('" +
                id + "','" + first_name + "','" + last_name + "','" + email + "','" + phone + "','" + encryptedPassword + "','" + status + "','" +
                + Exam_Roll_number + "','" + PU_Registration_num + "','" + level + "','" + Program + "','" + Semester + "','" + year + "','" + img_name + "')";
            connection.query(sql, function (err, result) {
                if(!err){
                    res.render('add-user', { alert: "User added successfully" });
                }else{
                 console.log(err)
                }
                
            });
        });

    } 
    else {
        // message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.render('', { message: message });
    }

}


exports.userdetails = (req, res) => {
    var result; 
    id = req.params.id;
    console.log(id);
    var query1 = `SELECT * FROM subject WHERE 1`;
    //  console.log(query['id'])
    connection.query(query1, function(error, results1, fields) {
        if (error) throw error;
        if (results1.length > 0) {
            result = results1;
        }
    });
    var query = `SELECT * FROM users WHERE id="${id}"`;
     connection.query(query, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
   
                res.render('StudentDetails', {results ,result});
        }else{
            res.redirect('login');
        }
    });
           
}

exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM users',
        (err, rows) => {
            // When done with the connection, release it
            if (!err) {
                let removedUser = req.query.removed;
                res.render('view-users', { rows, removedUser });
            } else {
                console.log(err);
            }
            // console.log(' view 1 The data from user table: \n', rows);
        });
}
// View Users
exports.viewall = (req, res) => {

    // User the connection
     
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        connection.query(`SELECT * FROM exam_registration_form WHERE user_id="${req.body.user_id}"`,(err,rows)=>{

            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }
            console.log('view The data from user table: \n', rows);
        })
    });
    // console.log(rows)

}
exports.form = (req, res) => {
    res.render('add-user');
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    const query = `DELETE FROM users WHERE id="${id}"`;
    connection.query(query, (error, data) => {
        if (error) {
            throw error;
        } else {

            res.redirect("/");
        }
        console.log("delete successful.")
    });
}


exports.edit = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edit-user', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
}

// Update User
exports.update = async (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var Exam_Roll_number = req.body.Exam_Roll_number;
    var PU_Registration_num = req.body.PU_Registration_num;
    var level = req.body.level;
    var phone = req.body.phone;
    var Program = req.body.Program;
    var Semester = req.body.Semester;
    var year = req.body.year;
    var status = req.body.status;
    var password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)
    var id = req.params.id;
    // User the connection
    var sql = `UPDATE users SET first_name="${first_name}", 
  last_name="${last_name}", email="${email}", phone="${phone}", 
   password="${encryptedPassword}", 
   status="${status}", Exam_Roll_number="${Exam_Roll_number}", 
  PU_Registration_num="${PU_Registration_num}", level="${level}", 
  Program="${Program}", Semester="${Semester}", year="${year}"  WHERE id = "${req.params.id}"`
    connection.query(sql, (err, rows) => {
        if (!err) {
            // User the connection
            connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
                } else {
                    console.log(err);
                }
                console.log('The data from user table: \n', rows);
            });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
}


exports.loginGet = (req, res) => {
    res.render('login-form');
}

exports.login =async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    var hash = bcrypt.hashSync(password, 10);
    const bcryptPassword = bcrypt.compareSync(password, hash);
    console.log(bcryptPassword)
    console.log(email)
    if (email && bcryptPassword) {
        var query = `SELECT * FROM users WHERE email="${email}"`;
        //  console.log(query['id'])
        connection.query(query, [email, bcryptPassword], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                if(!bcrypt.compareSync(password, results[0]['password']))
                {
                    response.render("login-form", { alert: 'Incorrect Username and/or Password!' });
                }
                if (email === "ishworineupane@gmil.com" || email === "dt2449148@gmail.com") {
                    // request.session.loggedin = true;
                    request.session.adminlogin = '1';
                    request.session.email = email;
                    response.redirect('/');
                } else {
                   
                    // console.log(results)
                        
                        var resultsid = results[0].id;
                        console.log(resultsid)
                        request.session.userlogin = '1';
                    response.redirect("/user/"+resultsid);
                }
            } else {
                response.render("login-form", { alert: 'Incorrect Username and/or Password!' });
            }
            response.end();
        });
    } else {
        response.render("login-form", { alert: 'Incorrect Username and/or Password!' });
        // response.end();
    }
}
exports.logout = (req, res, next) => {

    req.session.destroy(function(err) {
        // cannot access session here
      })
    
    res.redirect("login")
    // })


}

exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log(' find The data from user table: \n', rows);
    });
}

// exports.admit = function (req, res) {
//     var message = '';
//     var id = req.params.id;
//     var resultsql2;
//     var resultsql1;
//     var level_id=req.body.level_id;
//     var sql = "SELECT * FROM `users` WHERE `id`='" + id + "'";
//     connection.query(sql, function (err, result) {
//         resultsql1=result;
//         if (result.length <= 0)
//             message = "Profile not found!";
//         console.log(resultsql1, "sql1")
        
//     });
//     var sql2="Select * FROM 'subject' WHERE level_id='" + level_id +"'";
//     connection.query(sql2,function(error,result2){
//         resultsql2=result2;
//         console.log(resultsql2)
//     })
//     res.render('admitcard', { data: resultsql1 });
// };

exports.admit = function(req, res) {

    subjectdata = [];
    var message = '';
    var id = req.params.id;
    console.log(id + "id");

    let resultsql2 = "";
    let resultsql1 = "";
    var sql = `SELECT * FROM users WHERE id= "${id}"`;
    connection.query(sql, function(err, result) {


        if (result.length >= 0) {
            resultsql1 = result;
            // console.log(result);
            message = "Profile not found!";
            // console.log(resultsql1);




            var sql1 = `SELECT * FROM exam_registration_form WHERE user_id = "${id}"`;
            connection.query(sql1, function(error, result1) {
                if (result1.length >= 0) {
                    resultsql2 = result1;
                    // console.log(result);
                    var subject;

                    result1.forEach(resultsql => {
                        subject = resultsql['subject_id'].split(',');

                        backsubject = resultsql['back_id'].split(',');
                        console.log(subject);
                        // subject.forEach(element => {
                        // setvalue(subject);
                        // });
                        // exit();
                        res.render('admitcard', { data: resultsql1, data1: subject,backsubject });
                    });
                }
            });


            // res.render('admitcard', { data: resultsql1, data1: subject,backsubject });
        }

    });









};

exports.changePassword=(req,res)=>{
    res.render("login-form")
}

exports.changedPassword=(req,res)=>{
    res.render("login-form",{alert:"msg"})
}

