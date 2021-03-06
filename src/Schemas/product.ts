import { model, Schema } from "mongoose"
import category from "./category"
import salles from "./Salles"
import IProduct from "./Schema Interface/IProduct"

var product = new Schema<IProduct>({
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
    description: {
        type: String,
        lowercase: true
    },
    description2: {
        type: String,
        lowercase: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: category,
        required: true,
    },
    inKg: {
        type: Boolean,
        required: true
    },
    salles: {
        type: [salles]
    },
    amount: {
        type: Number,
        required: true
    },
    hasImg: {
        type: Boolean,
        default: false
    },
    gstIn: {
        type: Number,
        default: 0
    }
})

export default model<IProduct>("Product", product)