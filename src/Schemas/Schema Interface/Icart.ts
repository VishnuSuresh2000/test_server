import { Document, Types } from "mongoose";
import { paymentProgress } from "../CustomEnum/CartProgress";

export default interface Icart extends Document{
    productlist_id:Types.ObjectId,
    customer_id:Types.ObjectId,
    count:number,
    dataOfCreation:Date,
    dataOfCompltion?:Date,
    dataOfPayment?:Date,
    paymentComplete:boolean,
    completed:boolean,
    progress:paymentProgress,
    salles_id:Types.ObjectId
}