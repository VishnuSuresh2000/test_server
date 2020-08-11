import { Request, Response, Router } from 'express';
import { changeStateSyncCategory } from '../../CustomStream/CheckDataChaged';
import CRUD from '../../DataBase/crud';
import category from '../../Schemas/category';
import {outFunction } from '../functions';
import fs from 'fs'
var crudCategory: CRUD = new CRUD(category)

import multer from "multer"
import { addImgCategory } from './functions';
import path from 'path';
import checkIfAuthenticated from '../../MiddleWare/Auth/auth';
import checkIsAdmin from '../../MiddleWare/Auth/CheckIsAdmin';


var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'upload/category')
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname) //Appending .jpg
    }
})

var uploadMulter = multer({ storage: storage })

var route_category = Router()

async function syncWithUI(fun: Promise<string>) {
    try {
        let data = await fun
        changeStateSyncCategory.push("true")
        return data
    } catch (error) {
        throw error
    }

}

route_category.get('/getImage/:name', async (req: Request, res: Response) => {
    var location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/category/${req.params.name}.png`)
    try {
        if (!fs.existsSync(location)) {
            location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/NoImg.png`)
            await addImgCategory(req.params.name, false);
        }
    } catch (error) {
        console.log("error from getimag in category",error)
        location = path.join(path.dirname(path.dirname(path.dirname(__dirname))), `upload/NoImg.png`)
    } finally {
        res.sendFile(location)
    }
})
route_category.post('/uploadImg/:id', checkIfAuthenticated,checkIsAdmin, uploadMulter.single('imgUrl'), async (req: Request, res: Response) => {
    outFunction(res,  addImgCategory(req.params.id, true))
})



route_category.get('/', async (_req: Request, res: Response) =>
    outFunction(res, crudCategory.read()))
route_category.post('/create', checkIfAuthenticated,checkIsAdmin, async (req: Request, res: Response) =>
    outFunction(res, syncWithUI(crudCategory.addData(req.body)))
)
route_category.get('/:id', async (req: Request, res: Response) =>
    outFunction(res, crudCategory.readSingleRecord(req.params.id)))

route_category.put('/update/:id', checkIfAuthenticated,checkIsAdmin, async (req: Request, res: Response) =>
    outFunction(res, syncWithUI(crudCategory.updateRecord(req.params.id, req.body)))
)
// route_category.delete('/:id', async (req: Request, res: Response) =>
//     outFunction(res, syncWithUI(crudCategory.deleteRecord(req.params.id)))
// )



export default route_category


