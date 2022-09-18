module.exports = function (req, res, next) {
    if (req.session.adminlogin === '1') {
        next();
    } else {
       res.redirect('/login');
    }
};

