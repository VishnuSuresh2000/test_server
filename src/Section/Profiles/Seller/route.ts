import { Request, Response, Router } from "express";
import checkIfAuthenticated from "../../../MiddleWare/Auth/auth";
import userInformation from "../../../MiddleWare/DataWares/GetProfileInformation";
import seller from "../../../Schemas/seller";
import { outFunction } from "../../functions";
import { addAddress, addIfProfileNotExistFirebase, checkHasAddress } from "../functions";


var router = Router()

router.use(checkIfAuthenticated)
router.use(userInformation(seller))
router.post('/create', async (req: Request, res: Response) => {
    console.log(res.locals.firebase_id)
    outFunction(res, addIfProfileNotExistFirebase(req.body, res.locals.firebase_id, seller))
})

router.get('/checkForExist', async (_req: Request, res: Response) => {
    outFunction(res, Promise.resolve(true))
})

router.get("/hasAddress", async (_req: Request, res: Response) => {
    console.log("user id from middleware ", res.locals.userId)
    outFunction(res, checkHasAddress(res.locals.userId, seller))
})

router.put('/addAddress', async (req: Request, res: Response) => {
    console.log("user id from middleware ", res.locals.userId)
    outFunction(res, addAddress(res.locals.userId, req.body, seller))
})

export default router