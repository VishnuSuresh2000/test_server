import {Schema,Document, model} from "mongoose"
import category from "./category"


interface IProduct extends Document{
    name:string,
    description:string,
    category:Schema.Types.ObjectId,
    inKg:boolean
}

var product=new Schema({
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
    }

})

export default model<IProduct>("Product",product)