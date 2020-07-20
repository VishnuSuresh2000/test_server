import { Document } from 'mongoose'
import IAddress from './IAddress';

export default interface ICommonProfile extends Document {
    firstName:string,
    lastName:string,
    phoneNumber:number,
    email:number,
	sex:boolean, //is true male and if false female
    address:IAddress,
    active:boolean,
    userCreation:Date,
    lastLogin:Date,
    firebase_id:string,
    isVerified:boolean
}