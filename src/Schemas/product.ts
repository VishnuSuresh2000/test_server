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
    description: {
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
    }
})

export default model<IProduct>("Product", product)