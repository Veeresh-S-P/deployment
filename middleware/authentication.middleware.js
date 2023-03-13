const jwt = require('jsonwebtoken');
require("dotenv").config()
const {User}=require("../models/user")
const {blacklist}=require("./config/blacklist")

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
        return res.send("login again")
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    
    const user=await User.findById(userId);
    if (!user){
      return res.status(401).json({ message: 'Unauthorized' });
    }

   
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {authMiddleware};