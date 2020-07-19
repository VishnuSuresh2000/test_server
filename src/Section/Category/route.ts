import { Request, Response, Router } from 'express';
import changeState from '../../CustomStream/CheckDataChaged';
import CRUD from '../../DataBase/crud';
import category from '../../Schemas/category';
import { outFunction } from '../functions';
var crudCategory: CRUD = new CRUD(category)

var route_category = Router()

route_category.get('/', async (_req: Request, res: Response) =>
    outFunction(res, async () => crudCategory.read()))



route_category.post('/', async (req: Request, res: Response) => 
outFunction(res,async () => {
    try {
        let data =await crudCategory.addData(req.body)
        changeState.push("true")
        console.log("set to true")
        return data
    } catch (error) {
        throw error
    }
})
)
route_category.get('/:id', async (req: Request, res: Response) => 
outFunction(res, () => crudCategory.readSingleRecord(req.params.id)))
route_category.put('/:id', async (req: Request, res: Response) => outFunction(res, () => crudCategory.updateRecord(req.params.id, req.body)))
route_category.delete('/:id', async (req: Request, res: Response) => outFunction(res, () => crudCategory.deleteRecord(req.params.id)))


export default route_category


