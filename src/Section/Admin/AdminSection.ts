import { NextFunction, Response, Request } from "express";
import { Model } from "mongoose";
import ICommonProfile from "../../Schemas/Schema Interface/ICommonProfile";

function adminSection(model: Model<ICommonProfile>) {
    return async function (req: Request, res: Response, next: NextFunction) {

    }
}