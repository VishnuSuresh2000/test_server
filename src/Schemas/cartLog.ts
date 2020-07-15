import { model,Schema } from "mongoose";
import ICartLog from "./Schema Interface/ICartLog";
import productlist from "./productlist";

var cartLog=new Schema({
    product_name:{
        type:String,
        require:true
    },
    seller_name:{
        type:String,
        require:true
    },
    seller_addres:{
        type:String,
        require:true
    },
    farmer_name:{
        type:String,
        require:true
    },
    farmer_address:{
        type:String,
        require:true
    },
    farmer_number:{
        type:Number,
        require:true
    },
    seller_number:{
        type:Number,
        require:true
    },
    count:{
        type:Number,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        required:true
    },
    customer_name:{
        type:String,
        require:true
    },
    customer_address:{
        type:String,
        require:true
    },
    customer_number:{
        type:Number,
        require:true
    },
    productlist_id:{
        type:Schema.Types.ObjectId,
        ref:productlist
    }
})

export default model<ICartLog>("CartLog",cartLog)