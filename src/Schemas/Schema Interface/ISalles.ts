import { Document, Types } from "mongoose";

export default interface ISalles extends Document{
    seller_id:Types.ObjectId,
    farmer_id:Types.ObjectId,
    count?:number,
    toShow?:boolean,
    dateOfCreation?:Date,
    dateOfUpdate?:Date,
    isVerified?:boolean,
    
}