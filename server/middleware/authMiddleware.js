const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = function (req, res, next) {
    if (req.method ==="OPTIONS"){
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(401).json({message:"Тіркелмеген"});
        }
        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        next();
    } catch(e){
        res.status(401).json({message:"Тіркелмеген"})
    }
}