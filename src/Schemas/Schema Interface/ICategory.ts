import { Document } from "mongoose";

export interface ICategory extends Document{
    name:string,
    hasImg:boolean,
    name2:string
}