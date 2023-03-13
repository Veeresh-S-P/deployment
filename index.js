const express = require('express');

const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {connection}=require("./config/db")
const app =express()
const {blacklist}=require("./config/blacklist")
const{authmiddleware}=require("../backend/middleware/authentication");
const {autherisemiddleware}=require("../backend/middleware/autherisemiddleware")
app.use(express.json())
const {userrouter}=require("./routes/user.route")
const {productrouter}=require("./routes/product.route")


app.use("/signup", userrouter)
app.use("/login", userrouter)
app.use(authmiddleware)
app.use("/logout",userrouter)
app.use("/products",productrouter)
app.use(autherisemiddleware)
app.use("/addproducts", productrouter)
app.use("/deleteproducts",productrouter)
  
    
  
 

app.listen(8000, async()=>{

    try{
 await connection
 console.log("connected to db")
    }catch(error){
console.log("error in connection")
    }

    console.log('listening on port 8080')
})

