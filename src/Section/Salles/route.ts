import { Router, Request, Response } from "express";
import { outFunction } from "../functions";
import { addToSalles, getAllSalles, getAllSallesProductByCategory, toShowSalles, toVerifieSalles } from "./functions";

var route_salles = Router()

// route_salles.get('/', async (_req: Request, res: Response) => {
//     outFunction(res, async () => await getAllSalles())
// })

// route_salles.get('/getProductByCategory/:id', async (req: Request, res: Response) => {
//     outFunction(res, async () => await getAllSallesProductByCategory(req.params.id))
// })

// route_salles.post('/:id', async (req: Request, res: Response) => {
//     outFunction(res, async () => await addToSalles(req.params.id, req.body))
// })

// route_salles.put('/toVerifiy', async (req: Request, res: Response) => {

//     outFunction(res, async () => await toVerifieSalles(req.body.id, req.body.value))

// })
// route_salles.put('/toShow', async (req: Request, res: Response) => {

//     outFunction(res, async () => await toShowSalles(req.body.id, req.body.value))

// })

export default route_salles