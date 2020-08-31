import { NextFunction, Request, Response, Router } from "express";
import checkIfAuthenticated from "../../../MiddleWare/Auth/auth";
import userInformation from "../../../MiddleWare/DataWares/GetProfileInformation";
import customer from "../../../Schemas/customer";
import { customerSectionForCart } from "../../Cart/route";
import { outFunction } from "../../functions";
import { customerSectionSalles } from "../../Salles/route";
import { addAddress, addIfProfileNotExistFirebase, checkHasAddress, getAllDataMinimal, getUserData } from "../functions";

var router = Router()
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("in the route")
//     next()
// })
router.use(checkIfAuthenticated)
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("check auth")
//     next()
// })
router.use(userInformation(customer))
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("get the user")
//     next()
// })
customerSectionSalles(router)
customerSectionForCart(router)

router.post('/create', async (req: Request, res: Response) => {
    outFunction(res, addIfProfileNotExistFirebase(req.body, res.locals.firebase_id, customer))
})

router.get('/checkForExist', async (_req: Request, res: Response) => {
    outFunction(res, Promise.resolve(true))
})

router.get("/hasAddress", async (_req: Request, res: Response) => {
    outFunction(res, checkHasAddress(res.locals.userId, customer))
})

router.put('/addAddress', async (req: Request, res: Response) => {
    outFunction(res, addAddress(res.locals.userId, req.body, customer))
})

export function customerMinimalData(route: Router) {
    route.get('/customer/data', async (_req: Request, res: Response) => {
        outFunction(res, getAllDataMinimal(customer))
    })
}

router.get('/userData', async (_req: Request, res: Response) => {
    outFunction(res, getUserData(res.locals.userId, customer))
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