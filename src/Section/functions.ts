import { Response } from 'express'

export async function outFunction(res: Response, callBackFunction: Promise<any>) {
    try {
        let temp=await callBackFunction
        res.locals="No Data Available";
        res.send({
            data: temp
        })
    } catch (error) {
        console.log("Some test in error",error instanceof Error)
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


// export async function checkIsAdmin(res: Response, callBack: Promise<any>) {

//     try {
//         if (res.locals.isAdmin) {

//             return await callBack
//         } else {
//             throw new Error("Not Admin");
//         }
//     } catch (error) {
//         console.log("Error from admincheck", error)
//         throw error
//     }

// }