import { Router, Response, Request } from 'express'
import { getAllProduct, addProduct, deleteProduct, readSingleProduct, updateProduct, addImag } from './functions'
import { outFunction } from '../functions';
import fs from 'fs'
import path from 'path'

import multer from "multer"
import { fstat } from 'fs';

var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'upload/product')
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname) //Appending .jpg
    }
})
var uploadMulter = multer({ storage: storage })

var route_product = Router()

route_product.get('/getImage/:name',async(req: Request, res: Response)=>{
    var location=path.join(path.dirname(path.dirname(path.dirname(__dirname))),`upload/product/${req.params.name}.png`)
    try {
        if(! fs.existsSync(location)){
            location=path.join(path.dirname(path.dirname(path.dirname(__dirname))),`upload/noImg.png`)
        }
    } catch (error) {
        location=path.join(path.dirname(path.dirname(path.dirname(__dirname))),`upload/NoImg.png`)
    }finally{
        res.sendFile(location)
    }
})


route_product.get('/', async (_req: Request, res: Response) => {
    outFunction(res, async () => await getAllProduct())
});

route_product.post('/uploadImg/:id', uploadMulter.single('imgUrl'), async (req: Request, res: Response) => {
    outFunction(res, async () => addImag(req.params.id))
})

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