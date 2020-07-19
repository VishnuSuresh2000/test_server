import { Response } from 'express'

export async function outFunction(res: Response, callBackFunction: Function) {
    
    try {
        let temp=await callBackFunction()
        res.send({
            data: temp
        })
    } catch (error) {
        res.locals="No Data Available";
        console.log("get all", error)
        if(error instanceof Error){
            res.status(400).send({
                data:`${error.message}`
            })
        }else{
            res.status(400).send({
                data:`${error}`
            })
        }
        
    }
}