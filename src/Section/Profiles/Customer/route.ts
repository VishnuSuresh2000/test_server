import { Request, Response, Router } from "express";
import checkIfAuthenticated from "../../../MiddleWare/Auth/auth";
import userInformation from "../../../MiddleWare/DataWares/GetProfileInformation";
import customer from "../../../Schemas/customer";
import { outFunction } from "../../functions";
import { addAddress, addIfProfileNotExistFirebase, checkHasAddress } from "../functions";

var router = Router()

router.use(checkIfAuthenticated)
router.use(userInformation(customer))
router.post('/create', async (req: Request, res: Response) => {
    console.log(res.locals.firebase_id)
    outFunction(res, addIfProfileNotExistFirebase(req.body, res.locals.firebase_id, customer))
})

router.get('/checkForExist', async (_req: Request, res: Response) => {
    outFunction(res,Promise.resolve(true))
})

router.get("/hasAddress", async (_req: Request, res: Response) => {
    console.log("user id from middleware ", res.locals.userId)
    outFunction(res, checkHasAddress(res.locals.userId, customer))
})

router.put('/addAddress', async (req: Request, res: Response) => {
    console.log("user id from middleware ", res.locals.userId)
    outFunction(res,  addAddress(res.locals.userId, req.body, customer))
})



// router.get('/',async(_req:Request,res:Response)=>{
//     outFunction(res, async () => crud.read())
// })

// router.post('/',)
// router.get('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => crud.readSingleRecord(req.params.id))
// })

// router.put('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => updateIfProfileNotExist(req.params.id,req.body,customer))
// })
// router.delete('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => crud.deleteRecord(req.params.id))
// })

// router.get('/phNoExist/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => isPhoneNumberAlreadyExist(+req.params.id,customer))
// })

// router.get('/isExistWithFirebaseId',async(req:Request,res:Response)=>{
//     outFunction(res, async () => isExistWithFirebaseId(req.body.firebase_id,customer))
// })

export default router