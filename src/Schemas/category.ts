import { Schema, model } from 'mongoose'
import { ICategory } from './Schema Interface/ICategory'

const category = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    }
})


export default model<ICategory>("Category", category)