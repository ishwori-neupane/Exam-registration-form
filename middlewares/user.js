module.exports = function (req, res, next) {
    if (req.session.userlogin === '1') {
        next();
    } else {
       res.redirect('/login');
    }
};