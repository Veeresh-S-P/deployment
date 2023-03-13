const mongoose=require("mongoose")

const productschema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    seller:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    }

})

const product=mongoose.model("product",productschema)

module.exports={
    product
}