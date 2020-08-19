import { Schema, model } from "mongoose";

import customer from "./customer";
import Icart from "./Schema Interface/Icart";
import { paymentProgress } from "./CustomEnum/CartProgress";
import salles from "./Salles";
import product from "./product";


var cart = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: customer
    },
    count: {
        type: Number,
        required: true,
    },
    dataOfCreation: {
        type: Date,
        default: new Date(),
    },
    dataOfCompltion: {
        type: Date
    },
    dataOfPayment: {
        type: Date
    },
    paymentComplete: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    progress: {
        type: String,
        enum: paymentProgress,
        default: paymentProgress.onProgress
    },
    salles_id: {
        type: Schema.Types.ObjectId,
        ref: salles
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: product
    }

})

export default model<Icart>("Cart", cart)