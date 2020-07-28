import { NextFunction, Response, Request } from "express";
import { Model } from "mongoose";
import ICommonProfile from "../../Schemas/Schema Interface/ICommonProfile";
import { outFunction } from "../../Section/functions";

export default function userInformation(model: Model<ICommonProfile>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            let user = await model.findOne({ firebase_id: res.locals.firebase_id })
            if (req.url == "/create") {
               next()  
            } else if (user == null) {
                outFunction(res, () => { throw new Error("User Must Register") })
            } else {
                res.locals.userId = user._id
                next()
            }
        } catch (error) {
            console.log(error)
            outFunction(res, () => { throw new Error("Server Error") })
        }
}
}