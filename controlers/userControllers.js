const mysql = require("mysql");
const session = require('express-session');
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
const getDetails = (req, res) => {

    res.render("index")
    console.log('Request Url:' + req.url);
}

exports.create = async(req, res) => {
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
    // var comments = req.body.comments;
    var phone = req.body.phone;
    var Program = req.body.Program;
    var Semester = req.body.Semester;
    var year = req.body.year;
    // var pass_photo = req.body.pass_photo;
    var id = req.body.id;
    var status = req.body.status
    var password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)

    var confirmedPassword = req.body.confirmedPassword
    let searchTerm = req.body.search;
   
    // User the connection
    var sql = "INSERT INTO users (id, first_name, last_name, email, phone, password, confirmedPassword, status,  Exam_Roll_number, PU_Registration_num, level, Program, Semester, year,file_src) VALUES ('" +
        id + "','" + first_name + "','" + last_name + "','" + email + "','" + phone + "','" + encryptedPassword + "','" + encryptedPassword + "','" + status + "','" +
         + Exam_Roll_number + "','" + PU_Registration_num + "','" + level + "','" + Program + "','" + Semester + "','" + year + "','" + file_src + "')";
    connection.query(sql, (error, rows) => {
        if (!error) {
            res.render('add-user', { alert: 'User added successfully.' });
        } else {
            console.log(error);
        }
        console.log('The data from user table: \n', rows);
        console.log(encryptedPassword)
        //  let hashedPassword= await bcrypt.hash(password,8)
        //  console.log(hashedPassword)
        // res.render("");
    })

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
                console.log('The data from user table: \n', rows);
            });
    }
    // View Users
exports.viewall = (req, res) => {

    // User the connection
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-user', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });

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
exports.update = (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var Exam_Roll_number = req.body.Exam_Roll_number;
    var PU_Registration_num = req.body.PU_Registration_num;
    var level = req.body.level;
    // var comments = req.body.comments;
    var phone = req.body.phone;
    var Program = req.body.Program;
    var Semester = req.body.Semester;
    var year = req.body.year;
    // var pass_photo = req.body.pass_photo;
    var status = req.body.status;
    var password = req.body.password;
    var confirmedPassword = req.body.confirmedPassword;
    var id = req.params.id;
    // User the connection
    var sql = `UPDATE users SET first_name="${first_name}", 
  last_name="${last_name}", email="${email}", phone="${phone}", 
   password="${password}", confirmedPassword="${confirmedPassword}", 
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
                  response.render("login", { alert: 'Incorrect Username and/or Password!' });
              }
              if (email === "ishworineupane@gmil.com" || email === "dt2449148@gmail.com") {
                  request.session.loggedin = true;
                  request.session.email = email;
                  response.redirect('/');
              } else {
                  request.session.loggedin = true;
                  request.session.email = email;
                  request.session.user_id = results[0].id;
                  request.session.save(function(err) {
                      // session saved
                  })


                  console.log(results)
                      // request.session.username='fahad';
                      // response.send('<h4>Logged in successfully</h4>');
                      // response.render("StudentDetails", { results });
                  response.render("StudentDetails", { results });
              }
          } else {
              response.render("login", { alert: 'Incorrect Username and/or Password!' });
          }
          // response.end();
      });
  } else {
      response.render("login", { alert: 'Incorrect Username and/or Password!' });
      // response.end();
  }
};
// exports.login =async (request, response) => {
//     let email = request.body.email;
//     let password = request.body.password;
//     var hash = bcrypt.hashSync(password, 10);
//     const bcryptPassword = bcrypt.compareSync(password, hash);
//     console.log(bcryptPassword)
//     console.log(email)
//     if (email && bcryptPassword) {
//         var query = `SELECT * FROM users WHERE email="${email}"  `;
//         //  console.log(query['id'])
//         connection.query(query, [email], function(error, results, fields) {
//             if (error) throw error;
//             if (results.length > 0) {
//                 if (email === "ishworineupane@gmil.com" || email === "dt2449148@gmail.com") {
//                     request.session.loggedin = true;
//                     request.session.email = email;
//                     response.redirect('/');
//                 } else {
//                     request.session.loggedin = true;
//                     request.session.email = email;
//                     request.session.user_id = results[0].id;
//                     request.session.save(function(err) {
//                         // session saved
//                     })


//                     console.log(results)
//                         // request.session.username='fahad';
//                         // response.send('<h4>Logged in successfully</h4>');
//                         // response.render("StudentDetails", { results });
//                     response.render("StudentDetails", { results });
//                 }
//             } else {
//                 response.render("login", { alert: 'Incorrect Username and/or Password!' });
//             }
//             // response.end();
//         });
//     } else {
//         response.render("login", { alert: 'Incorrect Username and/or Password!' });
//         // response.end();
//     }
// };


exports.logout = (req, res, next) => {
    console.log(new Date(Date.now()))
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
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
        console.log('The data from user table: \n', rows);
    });
}

