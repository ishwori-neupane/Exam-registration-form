const mysql = require("mysql");

const connection = mysql.createConnection({
  database: "user",
  host: "localhost",
  user: "root",
  password: ""
})

exports.chooseSubjects=(req,res,next)=>{
    var sql="SELECT Exam_Roll_number FROM user UNION SELECT Semester,Subject FROM subjects WHERE Serial_no BETWEEN 1 AND 5";
    console.log(sql)
    
}
r

exports.loginGet = (req, res) => {
  res.render('login-form');
}
exports.login=(request, response)=> {
	let email = request.body.email;
	let password = request.body.password;
  let role=req.body.Role;
	if (email && password) {
      var query='SELECT * FROM user WHERE email = ? AND password = ?';
      connection.query(query, [email, password], function(error, results, fields) {
			if (error) throw error;

			if (results.length > 0) {
        // if(role=="Student"){
          request.session.loggedin = true;
				  request.session.email = email;
          // let email = req.query.email;
          response.redirect('/');
            
        // }
				
			} 
      else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Email and Password!');
		response.end();
	}
};

exports.logout=(req,res,next)=>{
  console.log(new Date(Date.now()))
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  // req.session.delete((err)=>{
    // res.status(200).json({
    //   success:true,
    //   message:"Logged out"
    // })
    res.redirect("login")
  // })

 
}