var jwt = require('jsonwebtoken');
require('dotenv').config();

const forgottoken ={
    
    generate:({usermail})=>{
        // return jwt.sign({usermail},process.env.JWT_SECRET),{ expiresIn: 60 * 6 };
        return jwt.sign({usermail},process.env.JWT_SECRET,{ expiresIn: 60 * 60 });
    }
};
module.exports = forgottoken;