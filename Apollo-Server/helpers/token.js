var jwt = require('jsonwebtoken');
require('dotenv').config();
const token ={
    generate:({usermail})=>{
        return jwt.sign({usermail},process.env.JWT_SECRET);
    }
};
module.exports = token;