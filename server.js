const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'adebola.rb.js@gmail.com',
            pass: 'password_for_your_email_address'
        }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: '"Adebola" <adebola.rb.js@gmail.com>', // sender address
    to: 'adebola.rb.js@gmail.com', // list of receivers
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context:{
        name: "Adebola", // replace {{name}} with Adebola
        company: 'My Company' // replace {{company}} with My Company
    }
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
exports.admit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var resultsql2;
    var resultsql1;
    var level_id=req.body.level_id;
    var sql = "SELECT * FROM `users` WHERE `id`='" + id + "'";
    connection.query(sql, function (err, result) {
        resultsql1=result;
        if (result.length <= 0)
            message = "Profile not found!";
        console.log(resultsql1, "sql1")
        
    });
    var sql2="Select * FROM 'subject' WHERE level_id='" + level_id +"'";
    connection.query(sql2,function(error,result2){
        resultsql2=result2;
        console.log(resultsql2)
    })
    res.render('admitcard', { data: resultsql1 ,data2:resultsql2 });
};