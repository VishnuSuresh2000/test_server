import { Document } from "mongoose";
import { paymentProgress } from "../CustomEnum/CartProgress";

export default interface IProgressNote extends Document{
    progress:paymentProgress,
    data:Date,
    massage:string
}