import { Request, Response, Router } from 'express';
import {changeStateSyncCategory} from '../../CustomStream/CheckDataChaged';
import CRUD from '../../DataBase/crud';
import category from '../../Schemas/category';
import { outFunction } from '../functions';
var crudCategory: CRUD = new CRUD(category)

var route_category = Router()

async function syncWithUI(fun: Promise<string>) {
    try {
        let data = await fun
        changeStateSyncCategory.push("true")
        console.log(`set to true in stream ${data} from fun`)
        return data
    } catch (error) {
        throw error
    }
}


route_category.get('/', async (_req: Request, res: Response) =>
    outFunction(res, async () => crudCategory.read()))
route_category.post('/', async (req: Request, res: Response) =>
    outFunction(res, async () => await syncWithUI(crudCategory.addData(req.body)))
)
route_category.get('/:id', async (req: Request, res: Response) =>
    outFunction(res, () => crudCategory.readSingleRecord(req.params.id)))
route_category.put('/:id', async (req: Request, res: Response) =>
    outFunction(res, async () => await syncWithUI(crudCategory.updateRecord(req.params.id, req.body)))
)
route_category.delete('/:id', async (req: Request, res: Response) =>
    outFunction(res, async () => await syncWithUI(crudCategory.deleteRecord(req.params.id)))
)


export default route_category


