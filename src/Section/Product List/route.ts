import { Router, Request, Response } from "express";
import { addToProductList, toShowProduct, addCount, readProductList, readProductListDoc, verifyProductOnList, deleteProductFromList, readSingleProductFromList, customerView, productWithCategory } from "./functions";
import { outFunction } from "../functions";

var route = Router()

route.get('/', async (_req: Request, res: Response) => {
        outFunction(res, async () => await readProductList())
})
route.get('/customerView', async (_req: Request, res: Response) => {
        outFunction(res, async () => await customerView())
})
route.get('/viewWithCategory/:cat', async (req: Request, res: Response) => {
        outFunction(res, async () => await productWithCategory(req.params.cat))
})
route.post('/', async (req: Request, res: Response) => {
        outFunction(res, async () => await addToProductList(req.body))
})

route.put('/toShow/:show', async (req: Request, res: Response) =>
        outFunction(res, async () => await toShowProduct(req.body.id, JSON.parse(req.params.show))))

route.put('/verify/:show', async (req: Request, res: Response) =>
        outFunction(res, async () => await verifyProductOnList(req.body.id, JSON.parse(req.params.show))))

route.put('/addCount/:count', async (req: Request, res: Response) =>
        outFunction(res, async () => await addCount(req.body.id, JSON.parse(req.params.count))))

route.get('/doc', async (_req: Request, res: Response) =>
        outFunction(res, async () => await readProductListDoc()))

route.delete('/:id', async (req: Request, res: Response) =>
        outFunction(res, async () => await deleteProductFromList(req.params.id)))

route.get('/:id', async (req: Request, res: Response) =>
        outFunction(res, async () => await readSingleProductFromList(req.params.id)))



export default route