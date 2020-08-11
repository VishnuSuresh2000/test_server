import { NextFunction, Request, Response } from "express";
import { AdminOnlyAcess, UnAuthorizedUser } from "../../CustomExceptions/Custom_Exception";
import { outFunction } from "../../Section/functions";

export default async function checkIsAdmin(_req: Request, res: Response, next: NextFunction) {
    try {
        if (res.locals.isAdmin ?? false) {
            next()
        } else {
            outFunction(res, Promise.reject(new AdminOnlyAcess()))
        }
    } catch (error) {
        console.log("Error from checkIsAdmin middleware", error)
        outFunction(res, Promise.reject(new UnAuthorizedUser()))
    }
}