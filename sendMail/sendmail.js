const path = require('path');
const nodemailer = require('nodemailer');


// // exports.sendMail=(req, res) => {
// //   res.render('contact');
// // }

// // exports.sendMail= (req, res) => {
// //       const output = `
// //         <p>You have a new contact request</p>
// //         <h3>Contact Details</h3>
// //         <ul>  
// //           <li>Name: ${req.body.name}</li>
// //           <li>Company: ${req.body.company}</li>
// //           <li>Email: ${req.body.email}</li>
// //           <li>Phone: ${req.body.phone}</li>
// //         </ul>
// //         <h3>Message</h3>
// //         <p>${req.body.message}</p>
// //       `;
    
// //       // create reusable transporter object using the default SMTP transport
// //       let transporter = nodemailer.createTransport({
// //         host: 'smtp.gmail.com',
// //         port: 587,
// //         secure: false, // true for 465, false for other ports
// //         auth: {
// //             user: 'ishaneupane135@gmail.com', // generated ethereal user
// //             pass: 'jeevika@135#'  // generated ethereal password
// //         },
// //         tls:{
// //           rejectUnauthorized:false
// //         }
// //       });
    
// //       // setup email data with unicode symbols
// //       let mailOptions = {
// //           from: '"Nodemailer Contact" <your@email.com>', // sender address
// //           to: 'RECEIVEREMAILS', // list of receivers
// //           subject: 'Node Contact Request', // Subject line
// //           text: 'In order to login to our system please enter this email number and password.', // plain text body
// //           html: output // html body
// //       };
    
// //       // send mail with defined transport object
// //       transporter.sendMail(mailOptions, (error, info) => {
// //           if (error) {
// //               return console.log(error);
// //           }
// //           console.log('Message sent: %s', info.messageId);   
// //           console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
// //           res.render('contact', {msg:'Email has been sent'});
// //       })
// //     }
// /* send reset password link in email */

// exports.changePassowrd=(req, res, next) =>{
 
//     var email = req.body.email;
 
//     //console.log(sendEmail(email, fullUrl));
 
//     connection.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
//         if (err) throw err;
         
//         var type = ''
//         var msg = ''
   
//         console.log(result[0]);
     
//         if (result[0].email.length > 0) {
 
//            var token = randtoken.generate(20);
 
//            var sent = sendEmail(email, token);
 
//              if (sent != '0') {
 
//                 var data = {
//                     token: token
//                 }
 
//                 connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
//                     if(err) throw err
         
//                 })
 
//                 type = 'success';
//                 msg = 'The reset password link has been sent to your email address';
 
//             } else {
//                 type = 'error';
//                 msg = 'Something goes to wrong. Please try again';
//             }
 
//         } else {
//             console.log('2');
//             type = 'error';
//             msg = 'The Email is not registered with us';
 
//         }
    
//         req.flash(type, msg);
//         res.redirect('/');
//     });
// }
 exports.sendEmail=(email, token)=> {
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '190108ishwori@cosmoscollege.edu.np', // Your email id
            pass: 'django_project' // Your password
        }
    });
    var mailOptions = {
        from: '190108ishwori@cosmoscollege.edu.np',
        to: email,
        subject: 'Reset Password Link - Tutsmake.com',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + token + '">link</a> to reset your password</p>'
    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });
}
exports.forgotPassword=(req, res, next)=> {
    res.render('index', {
    title: 'Forget Password Page'
    });
    }