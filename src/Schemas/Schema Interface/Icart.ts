import { Document, Types } from "mongoose";
import { paymentProgress } from "../CustomEnum/CartProgress";
import IProgressNote from "./IProgressNotes";

export default interface Icart extends Document {
    customer_id: Types.ObjectId,
    count: number,
    dataOfCreation: Date,
    dataOfCompltion?: Date,
    dataOfPayment?: Date,
    paymentComplete: boolean,
    completed: boolean,
    progress: paymentProgress,
    salles_id: Types.ObjectId,
    product_id: Types.ObjectId,
    totalAmount: number,
    cancel: boolean,
    progressNotes: Array<IProgressNote>,
    dataOfDalivary:Date
}