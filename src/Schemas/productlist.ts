import { model, Schema } from "mongoose";
import IProductList from "./Schema Interface/IProductList";
import product from "./product";
import farmer from "./farmer";
import seller from "./seller";

var productList=new Schema({
    product_id:{
        type:Schema.Types.ObjectId,
        ref:product,
        required:true
    },
    farmer_id:{
        type:Schema.Types.ObjectId,
        ref:farmer,
        required:true,

    },
    seller_id:{
        type:Schema.Types.ObjectId,
        ref:seller,
        required:true
    },
    count:{
        type:Number,
        required:true,
    },
    toShow:{
        type:Boolean,
        default:true
    },
    dateOfCreation:{
        type:Date,
        default:new Date()
    },
    dateOfUpdate:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        required:true
    }
})

export default model<IProductList>("ProductList",productList)