import { Schema } from "mongoose";
import farmer from "./farmer";
import ISalles from "./Schema Interface/IProductList";
import seller from "./seller";

var salles=new Schema<ISalles>({
    
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

export default salles