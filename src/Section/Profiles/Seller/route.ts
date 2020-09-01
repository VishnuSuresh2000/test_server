import { Request, Response, Router } from "express";
import checkIfAuthenticated from "../../../MiddleWare/Auth/auth";
import checkIsAdmin from "../../../MiddleWare/Auth/CheckIsAdmin";
import userInformation from "../../../MiddleWare/DataWares/GetProfileInformation";
import ICommonProfile from "../../../Schemas/Schema Interface/ICommonProfile";
import seller from "../../../Schemas/seller";
import { sellerSctionForCart } from "../../Cart/route";
import { outFunction } from "../../functions";
import { sallesSectionForSeller } from "../../Salles/route";
import { customerMinimalData } from "../Customer/route";
import { addAddress, addIfProfileNotExistFirebase, checkHasAddress, checkIsverified, getAllData, getUserData, Verifie } from "../functions";

var router = Router()
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("request get");
//     next()
// })
router.use(checkIfAuthenticated)
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("Checked auth");
//     next()
// })
//admin Section
router.get('/data', checkIsAdmin, async (_req: Request, res: Response) => {
    outFunction(res, getAllData(seller))
})
router.put('/verifie/:id', checkIsAdmin, async (req: Request, res: Response) => {
    outFunction(res, Verifie(req.params.id, req.body.value, seller))
})

// seller section

router.use(userInformation(seller))
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("got user");
//     next()
// })
sallesSectionForSeller(router)
sellerSctionForCart(router)
customerMinimalData(router)
// router.use(function(req:Request,res:Response,next:NextFunction){
//     console.log("down salles");
//     next()
// })
router.post('/create', async (req: Request, res: Response) => {
    var data: ICommonProfile = req.body;
    data.isVerified = false;
    outFunction(res, addIfProfileNotExistFirebase(data, res.locals.firebase_id, seller))
})

router.get('/checkForExist', async (_req: Request, res: Response) => {
    outFunction(res, checkHasAddress(res.locals.userId, seller))
})



router.put('/addAddress', async (req: Request, res: Response) => {

    outFunction(res, addAddress(res.locals.userId, req.body, seller))
})

router.get('/checkIsVerified', async (_req: Request, res: Response) => {

    outFunction(res, checkIsverified(res.locals.userId, seller))
})
router.get('/userData', async (_req: Request, res: Response) => {
    outFunction(res, getUserData(res.locals.userId, seller))
})

export default router