import farmer from "../../../Schemas/farmer";
import { Router, Request,Response } from "express";
import CRUD from "../../../DataBase/crud";
import { outFunction } from "../../functions";
import { addIfProfileNotExist, updateIfProfileNotExist, isPhoneNumberAlreadyExist } from "../functions";
var crudFarmer: CRUD = new CRUD(farmer)

var router_farmer=Router()


router_farmer.get('/',async(_req:Request,res:Response)=>{
    outFunction(res, async () => crudFarmer.read())
})

router_farmer.post('/',async(req:Request,res:Response)=>{
    outFunction(res, async () =>addIfProfileNotExist(req.body, res.locals.firebase_id,farmer) )

})
router_farmer.get('/:id',async(req:Request,res:Response)=>{
    outFunction(res, async () => crudFarmer.readSingleRecord(req.params.id))
})

router_farmer.put('/:id',async(req:Request,res:Response)=>{
    outFunction(res, async () => updateIfProfileNotExist(req.params.id,req.body,farmer))
})
router_farmer.delete('/:id',async(req:Request,res:Response)=>{
    outFunction(res, async () => crudFarmer.deleteRecord(req.params.id))
})

router_farmer.get('/phNoExist/:id',async(req:Request,res:Response)=>{
    outFunction(res, async () => isPhoneNumberAlreadyExist(+req.params.id,farmer))
})

export default router_farmer