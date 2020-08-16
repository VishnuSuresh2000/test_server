import { Request, Response, Router } from "express";
import checkIfAuthenticated from "../../MiddleWare/Auth/auth";
import checkIsAdmin from "../../MiddleWare/Auth/CheckIsAdmin";
import ISalles from "../../Schemas/Schema Interface/ISalles";
import { outFunction } from "../functions";
import { addToSalles, getAllSalles, getAllSallesForSeller, toShowSalles, updateCount } from "./functions";

export var router = Router()

router.get('/dataOfSalles/:id', async (req: Request, res: Response) => {
    outFunction(res, getAllSallesForSeller(req.params.id))
})

router.post('/addSalles/:id', async (req: Request, res: Response) => {
    outFunction(res, addToSalles(req.params.id, req.body))
})
adminSection(router)
export function sallesSectionForSeller(router: Router) {
    router.get('/salles/forSeller', async (_req: Request, res: Response) => {
        outFunction(res, getAllSallesForSeller(res.locals.userId))
    })
    router.post('/salles/addSalles/:id', async (req: Request, res: Response) => {
        let data: ISalles = req.body
        data.seller_id = res.locals.userId
        outFunction(res, addToSalles(req.params.id, data))
    })
    router.put('/salles/toShow/:id', async (req: Request, res: Response) => {
        outFunction(res, toShowSalles(req.params.id, req.body.value))
    })
    router.put('/salles/updateCount/:id', async (req: Request, res: Response) => {
        outFunction(res, updateCount(req.params.id, req.body.value))
    })
}
function adminSection(router: Router) {
    router.use(checkIfAuthenticated)
    router.use(checkIsAdmin)
    router.get('/data', (_req: Request, res: Response) => {
        outFunction(res, getAllSalles())
    })
    router.put('/toShow/:id', async (req: Request, res: Response) => {
        outFunction(res, toShowSalles(req.params.id, req.body.value))
    })
}



