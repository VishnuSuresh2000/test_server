import admin from '../../Micro_Server_Connections/firebaaseAdmin'
import { Response, Request, NextFunction } from "express";
import { outFunction } from '../../Section/functions';
import { NoUserLogin, UnAuthorizedUser } from '../../CustomExceptions/Custom_Exception';

const getAuthToken = (authToken: string) => {
    // console.log(authToken)
    if (
        authToken &&
        authToken.split(' ')[0] === 'Bearer'
    ) {
        return authToken.split(' ')[1];
    } else {
        return null
    }

};


export default async function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        let token = getAuthToken(req.headers.authorization as string)
        if (token != null) {
            const userInfo = await admin.auth().verifyIdToken(token)
            res.locals.firebase_id = userInfo.uid
            if (userInfo.email == "admin@beru-dev.com") {
                res.locals.isAdmin = true;
            } else {
                res.locals.isAdmin = false;
            }
            return next()
        } else {
            outFunction(res, Promise.reject(new NoUserLogin()))
        }
    } catch (error) {
        console.log("Error from checkIfAuthenticated middleware",error)
        outFunction(res, Promise.reject(new UnAuthorizedUser()))
    }
}

