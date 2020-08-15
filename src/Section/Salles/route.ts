import { Request, Response, Router } from "express";
import ISalles from "../../Schemas/Schema Interface/ISalles";
import { outFunction } from "../functions";
import { addToSalles, getAllSallesForSeller } from "./functions";

export var router = Router()

router.get('/dataOfSalles/:id', async (req: Request, res: Response) => {
    outFunction(res, getAllSallesForSeller(req.params.id))
})

router.post('/addSalles/:id', async (req: Request, res: Response) => {
    outFunction(res, addToSalles(req.params.id, req.body))
})

export function sallesSectionForSeller(router: Router) {
    router.get('/salles/forSeller', async (_req: Request, res: Response) => {
        outFunction(res, getAllSallesForSeller(res.locals.userId))
    })
    router.post('/salles/addSalles/:id', async (req: Request, res: Response) => {
        let data: ISalles = req.body
        data.seller_id = res.locals.userId
        outFunction(res, addToSalles(req.params.id, data))
    })

}



