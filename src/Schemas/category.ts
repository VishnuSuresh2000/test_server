import { Schema, model } from 'mongoose'
import { ICategory } from './Schema Interface/ICategory'

const category = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    name2: {
        type: String,
        required: true,
        lowercase: true
    },
    hasImg:{
        type:Boolean,
        default:false
    }
})


export default model<ICategory>("Category", category)