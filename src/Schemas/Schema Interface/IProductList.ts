import { Document, Types } from "mongoose";

export default interface IProductList extends Document{
    product_id:Types.ObjectId,
    seller_id:Types.ObjectId,
    farmer_id:Types.ObjectId,
    count?:number,
    toShow?:boolean,
    dateOfCreation?:Date,
    dateOfUpdate?:Date,
    isVerified?:boolean,
    amount:number
}