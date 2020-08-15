import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from "multer";
import path from 'path';
import checkIfAuthenticated from '../../MiddleWare/Auth/auth';
import checkIsAdmin from '../../MiddleWare/Auth/CheckIsAdmin';
import { outFunction } from '../functions';
import { addImag, addProduct, getAllProduct, getProductByCategory, readSingleProduct, updateProduct } from './functions';



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

route_product.get('/getImage/:name', async (req: Request, res: Response) => {
    var location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/product/${req.params.name}.png`)
    try {
        if (!fs.existsSync(location)) {
            location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/NoImg.png`)
            addImag(req.params.name, false)
        }
    } catch (error) {
        console.log("error from getimag in product", error)
        location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/NoImg.png`)
    } finally {
        res.sendFile(location)
    }
})


route_product.get('/data', async (_req: Request, res: Response) => {
    outFunction(res, getAllProduct())
});
route_product.get('/dataByCategory/:id', async (req: Request, res: Response) => {
    outFunction(res, getProductByCategory(req.params.id))
})
route_product.post('/uploadImg/:id', checkIfAuthenticated, checkIsAdmin, uploadMulter.single('imgUrl'), async (req: Request, res: Response) => {
    outFunction(res, addImag(req.params.id, true))
})

route_product.post('/create', checkIfAuthenticated, checkIsAdmin, async (req: Request, res: Response) => {
    outFunction(res, addProduct(req.body))
})


route_product.put("/update/:id", checkIfAuthenticated, checkIsAdmin, async (req: Request, res: Response) => {
    outFunction(res, updateProduct(req.params.id, req.body))
})

// route_product.delete("/:id", async (req: Request, res: Response) => {
//     outFunction(res, deleteProduct(req.params.id))
// })

route_product.get("/:id", async (req: Request, res: Response) => {
    outFunction(res, readSingleProduct(req.params.id))
})

export default route_product