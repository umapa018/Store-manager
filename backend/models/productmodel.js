import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number,required:true},
    image:{type:Array, required:true},
    category:{type:String, required:true},
    quantity:{type:Number, required:true},
})

const productmodel = mongoose.models.product || mongoose.model("product",productSchema) 

export default productmodel;