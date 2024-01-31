import mongoose from "mongoose";

const porductSchema = mongoose.Schema({
    productImage:{
        type:String,
        default:""
    },
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
    },
    productQuantity:{
        type:Number,
    }, 
},{timestamps:true})

const Product = mongoose.model('Product', porductSchema);
export default Product;