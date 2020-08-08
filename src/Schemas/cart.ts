import { Schema, model } from "mongoose";
import productlist from "./Salles";
import customer from "./customer";
import Icart from "./Schema Interface/Icart";
import { paymentProgress } from "./CustomEnum/CartProgress";
import salles from "./Salles";


var cart = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: productlist
    },
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
    }

})

export default model<Icart>("Cart", cart)