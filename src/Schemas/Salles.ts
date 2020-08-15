import { Schema } from "mongoose";
import farmer from "./farmer";
import ISalles from "./Schema Interface/ISalles";
import seller from "./seller";

var salles = new Schema<ISalles>({

    farmer_id: {
        type: Schema.Types.ObjectId,
        ref: farmer,
        required: true,
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: seller,
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
    toShow: {
        type: Boolean,
        default: false
    },
    dateOfCreation: {
        type: Date,
        default: new Date()
    },
    dateOfUpdate: {
        type: Date,
        default: new Date()
    },

})

export default salles