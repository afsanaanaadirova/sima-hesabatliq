const fs   = require('fs');
const jwt   = require('jsonwebtoken');
var publicKEY = fs.readFileSync('../config/public.key', 'utf8');
var privateKEY  = fs.readFileSync('../config/private.key', 'utf8');
module.exports = {
    sign: (payload) => {

        const signOptions = {
            expiresIn:  "8h",
            algorithm:  "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: (token) => {
        if(token) {
            var verifyOptions = {
                expiresIn:  "8h",
                algorithm:  ["RS256"]
            };
            try{
                return jwt.verify(token, publicKEY, verifyOptions);
            }catch (err){
                console.log(err);
                return false;
            }
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
}