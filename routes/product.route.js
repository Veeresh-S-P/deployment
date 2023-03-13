const express = require('express');
const router = express.Router();
const {connection}=require("./config/db")
const {blacklist}=require("./config/blacklist")
const{authmiddleware}=require("../backend/middleware/authentication")
const {autherisemiddleware}=require("../backend/middleware/autherisemiddleware")
const { product } = require('./models/product');
const productrouter=express.Router()

productrouter.get("/products", authMiddleware, (req, res)=>{
    res.send("products");
    })
  
    productrouter.post("/addproducts", authMiddleware,autherisemiddleware, (req, res)=>{
      const role=req.user.role
      if(role=="seller"){
      res.send("products");
      }else{
          res.send("not authorised")
      }
      })
  
      productrouter.delete("/deleteproducts ", authMiddleware, autherisemiddleware, (req, res)=>{
          const role=req.user.role
          if(role=="seller"){
          res.send("delete product");
          }else{
              res.send("not authorised")
          }
          })

          module.exports={
            productrouter
          }