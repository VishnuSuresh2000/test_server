import { Router, Response, Request } from 'express'
import { getAllProduct, addProduct, deleteProduct, readSingleProduct, updateProduct } from './functions'
import { outFunction } from '../functions';
var route_product = Router()

route_product.get('/', async (_req: Request, res: Response) => {
    outFunction(res, async () => await getAllProduct())
});

route_product.post('/', async (req: Request, res: Response) => {
    outFunction(res, async () => addProduct(req.body))
})

route_product.put("/:id", async (req: Request, res: Response) => {
    outFunction(res, async () => await updateProduct(req.params.id, req.body))
})

route_product.delete("/:id", async (req: Request, res: Response) => {
    outFunction(res, async () => await deleteProduct(req.params.id))
})

route_product.get("/:id", async (req: Request, res: Response) => {
    outFunction(res, async () => await readSingleProduct(req.params.id))
})

export default route_product