const express = require('express');
const userrouter = express.Router();
const User = require('./models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {connection}=require("./config/db")
const {blacklist}=require("./config/blacklist")
const{authmiddleware}=require("../backend/middleware/authentication")

userrouter.post('/signup', async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;
  
      
      const userExists = await User.findOne({ $or: [{ username }, { email }] });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      
      const hashed_password = bcrypt.hashSync(password, 8)
      const user = new User({ username, email, hashed_password, role });
      await user.save();
  
      res.json({ message: 'User created successfully' });
    } catch (error) {
      res.send("error");
    }
  });
  
  
  userrouter.post('/login', async(req, res, next) => {
      try {
        const { username, password } = req.body;
    
        
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
       
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const token =jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1m'
        });
    
        res.json({ msg:"login succesfull",token });
      } catch (error) {
        console.log(error);
      }
    });

    userrouter.get("/logout", (req,res)=>{
        blacklist.push(req.headers?.authorization?.split(" ")[1])
    
       })

    module.exports={
userrouter
    }