import { model, Schema } from "mongoose";
import { paymentProgress } from "./CustomEnum/CartProgress";
import customer from "./customer";
import product from "./product";
import ProgessNote from "./ProgessNote";
import Icart from "./Schema Interface/Icart";


var cart = new Schema<Icart>({
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
    dataOfDalivary: {
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
        default: paymentProgress.onProgress
    },
    salles_id: {
        type: Schema.Types.ObjectId,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: product
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    cancel: {
        type: Boolean,
        default: false
    },
    progressNotes: {
        type: [ProgessNote]
    }

})

export default model<Icart>("Cart", cart)