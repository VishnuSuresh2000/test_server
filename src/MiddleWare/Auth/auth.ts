import admin from '../../Micro_Server_Connections/firebaaseAdmin'
import { Response, Request, NextFunction } from "express";
import { outFunction } from '../../Section/functions';

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
            // console.log(userInfo.uid)
            res.locals.firebase_id = userInfo.uid
            return next()
        } else {
            outFunction(res, () => { throw new Error("No User Found Login") })
        }
    } catch (error) {
        console.log(error)
        outFunction(res, () => { throw new Error("You are not authorized to make this request") })
    }
}

