import { model } from "mongoose";
import commonProfile from "./CommonProfileSchema";
import ICommonProfile from "./Schema Interface/ICommonProfile";

export default model<ICommonProfile>('Seller', commonProfile)