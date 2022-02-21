//Require module
var jwt = require('jsonwebtoken');

class JWT {
    generateAccessToken(UserData) {

        var tk = jwt.sign(UserData, process.env.TOKEN_SECRET, { expiresIn: '180000000000s' });
        return tk;
    }

}

module.exports = JWT;