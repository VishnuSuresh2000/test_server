import { Schema,Document } from "mongoose";
import ISalles from "./IProductList";

export default interface IProduct extends Document{
    name:string,
    description:string,
    category:Schema.Types.ObjectId,
    inKg:boolean,
    salles:Array<ISalles>
}