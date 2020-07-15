import { Router,Response,Request } from "express";
import { outFunction } from "../functions";
import { readCartLog } from "./function";

var router=Router()

router.get("/",async (_req:Request,res:Response)=>{
    outFunction(res,async()=>readCartLog())
})