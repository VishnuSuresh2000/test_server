import seller from "../../../Schemas/seller";
import { Router, Request,Response } from "express";
import CRUD from "../../../DataBase/crud";
import { outFunction } from "../../functions";
import { addIfProfileNotExist, updateIfProfileNotExist, isPhoneNumberAlreadyExist, varifyAccount } from "../functions";
var crudseller: CRUD = new CRUD(seller)

var router_seller=Router()


// router_seller.get('/',async(_req:Request,res:Response)=>{
//     outFunction(res, async () => crudseller.read())
// })

// router_seller.post('/',async(req:Request,res:Response)=>{
//     outFunction(res, async () =>addIfProfileNotExist(req.body, res.locals.firebase_id,seller) )

// })
// router_seller.get('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => crudseller.readSingleRecord(req.params.id))
// })

// router_seller.put('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => updateIfProfileNotExist(req.params.id,req.body,seller))
// })
// router_seller.delete('/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => crudseller.deleteRecord(req.params.id))
// })

// router_seller.get('/phNoExist/:id',async(req:Request,res:Response)=>{
//     outFunction(res, async () => isPhoneNumberAlreadyExist(+req.params.id,seller))
// })

// router_seller.put("/verify/:show",async(req:Request,res:Response)=>{
//     outFunction(res, async () => varifyAccount(req.body.id,JSON.parse(req.params.show),seller))
// })

export default router_seller