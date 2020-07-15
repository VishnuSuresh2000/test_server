import { model, Schema } from "mongoose";
import ICommonProfile from "./Schema Interface/ICommonProfile";
import commonProfile from "./CommonProfileSchema";


export default model<ICommonProfile>('Farmer', commonProfile)