import { Schema } from "mongoose";
import IAddress from "./Schema Interface/IAddress";

const address=new Schema<IAddress>({
    houseName:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    alternateNumber:{
        type:Number,
    },
    
})

export default address