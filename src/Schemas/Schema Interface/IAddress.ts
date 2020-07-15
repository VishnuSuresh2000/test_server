import { Document } from 'mongoose'

export default interface IAddress extends Document {
    houseName:string,
    locality:string,
    pinCode:number,
    city:string,
    district:string,
    state:string,
    alternateNumber:number|null,
}