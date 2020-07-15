import { Document, Schema } from "mongoose";

export default interface ICartLog extends Document{
    product_name:string,
    seller_name:string,
    seller_addres:string,
    seller_number:number,
    farmer_name:string,
    farmer_address:string,
    farmer_number:number,
    count:number,
    amount:number,
    date:Date,
    customer_name:string,
    customer_addres:string,
    customer_number:number,
    productlist_id:Schema.Types.ObjectId
}