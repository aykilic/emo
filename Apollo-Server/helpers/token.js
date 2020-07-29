var jwt = require('jsonwebtoken');
require('dotenv').config();
const token ={
    generate:({usermail,role})=>{
        return jwt.sign({usermail,role},process.env.JWT_SECRET);
    }
};
module.exports = token;