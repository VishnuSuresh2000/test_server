import { Schema, model } from "mongoose";
import productlist from "./Salles";
import customer from "./customer";
import Icart from "./Schema Interface/Icart";

var cart=new Schema({
    productlist_id:{
        type:Schema.Types.ObjectId,
        ref:productlist
    },
    customer_id:{
        type:Schema.Types.ObjectId,
        ref:customer
    },
    count:{
        type:Number,
        required:true,
    },
    dataOfCreation:{
        type:Date,
        default:new Date(),
    },
    dataOfCompltion:{
        type:Date
    },
    dataOfPayment:{
        type:Date
    },
    paymentComplete:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    }

})

export default model<Icart>("Cart",cart)