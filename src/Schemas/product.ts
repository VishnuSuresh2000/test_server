import { model, Schema } from "mongoose"
import category from "./category"
import salles from "./productlist"
import IProduct from "./Schema Interface/IProduct"

var product=new Schema<IProduct>({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        lowercase:true
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:category
    },
    inKg:{
        type:Boolean,
        required:true
    },
    salles:{
        type:[salles]
    }
})

export default model<IProduct>("Product",product)