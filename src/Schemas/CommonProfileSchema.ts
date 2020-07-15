import { Schema } from "mongoose";
import address from "./AddressSchema";
import ICommonProfile from "./Schema Interface/ICommonProfile";

const commonProfile =new Schema<ICommonProfile>({
    firstName:{
        type:String,
        required:true,
        lowercase:true
    },
    lastName:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:address,
        required:true
    },
    active:{
        type:Boolean,
        default:true,
    },
    userCreation:{
        type:Date,
        default:new Date()
    },
    lastLogin:{
        type:Date,
        default:new Date()
    },
    verified:{
        type:Boolean,
        default:false
    },
    firebase_id:{
        type:String,
        required:true
    },
    sex:{
        type:Boolean,
        required:true
    }
})

export default commonProfile