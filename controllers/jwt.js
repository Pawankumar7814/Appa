//Require module
var jwt = require('jsonwebtoken');
class JWT {
    generateAccessToken(UserDate) {

        var tk = jwt.sign(UserDate, process.env.TOKEN_SECRET, { expiresIn: '18000000000s' });
        var output = jwt.verify(tk, process.env.TOKEN_SECRET);
        return tk;
    }

}

module.exports = JWT;