import { Document, Types } from "mongoose";
import ISalles from "./ISalles";

export default interface IProduct extends Document {
    name: string,
    description: string,
    category: Types.ObjectId,
    inKg: boolean,
    amount: number,
    hasImg: boolean
    salles: Array<ISalles>,
    gstIn: number,
    name2: string,
    description2: string
}