
/* send verification link */
const sendEmail= (req, res, next) =>{
 
    var email = req.body.email;
 
    //console.log(sendEmail(email, fullUrl));
 
    connection.query('SELECT * FROM verifications WHERE email ="' + email + '"', function(err, result) {
        if (err) throw err;
         
        var type = 'success'
        var msg = 'Email already verified'
   
        console.log(result[0]);
     
        if (result.length > 0) {
 
           var token = randtoken.generate(20);
 
           if(result[0].verify == 0 ){
             var sent = sendEmail(email, token);
             if (sent != '0') {
 
 
                var data = {
                    token: token
                }
 
 
                connection.query('UPDATE verifications SET ? WHERE email ="' + email + '"', data, function(err, result) {
                    if(err) throw err
         
                })
 
                type = 'success';
                msg = 'The verification link has been sent to your email address';
 
            } else {
                type = 'error';
                msg = 'Something goes to wrong. Please try again';
            }
           }
 
 
        } else {
            console.log('2');
            type = 'error';
            msg = 'The Email is not registered with us';
 
        }
    
        req.flash(type, msg);
        res.redirect('/');
    });
}

module.exports=sendEmail;