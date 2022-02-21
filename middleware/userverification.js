module.exports = function(jwrt) {
    var jwt = require('jsonwebtoken');
    var out = {};
    out.checkcookie = function(req, res, next) {
        var is_user = res.locals.is_User;
        if (is_user == true) {
            next();
        } else {
            req.flash("error", "Log In First");
            res.status(200).redirect("/User/LogIn");
        }
    };

    out.checkuserexicte = function(req, res, next) {
        var is_user = res.locals.is_User;
        if (is_user == false) {
            next();
        } else {
            req.flash("error", "First Log out");
            res.status(200).redirect("../");
        }
    };

    out.authenticateToken = (req, res, next) => {



        try {
            var output1 = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
            var output2 = jwt.verify(res.locals.user, process.env.TOKEN_SECRET);
            if (output1.UD === output2.UD) {
                res.locals.UID = output1.UD;
                next();
            } else {
                req.flash("error", "Log In First");
                res.status(200).redirect("/User/LogIn");
            }
        } catch (E) {

            req.flash("error", "Log In First");
            res.status(200).redirect("/User/LogIn");
        }

    };

    return out;
};