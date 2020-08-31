import { Request, Response, Router } from 'express'
import { paymentProgress } from '../../Schemas/CustomEnum/CartProgress'
import Icart from '../../Schemas/Schema Interface/Icart'
import IProgressNote from '../../Schemas/Schema Interface/IProgressNotes'
import { outFunction } from '../functions'
import { addDelivaryDate, addMultiProductTobag, addProgress, checkAddOrUpdate, readCart, readCartLog, sellerCart } from './function'

export var route = Router()

route.get('/test/:id', async (req: Request, res: Response) => {
    outFunction(res, addMultiProductTobag(req.body, req.params.id))
})

export function customerSectionForCart(route: Router) {
    route.get('/cart/data', async (_req: Request, res: Response) => {
        outFunction(res, readCart(res.locals.userId, false))
    })
    route.get('/cartOrders/data', async (_req: Request, res: Response) => {
        outFunction(res, readCart(res.locals.userId, true))
    })
    route.get('/cartLog/data', async (_req: Request, res: Response) => {
        outFunction(res, readCartLog(res.locals.userId))
    })
    route.post('/cart/add', async (req: Request, res: Response) => {
        let data: Icart = req.body
        data.customer_id = res.locals.userId
        outFunction(res, checkAddOrUpdate(data))
    })
    route.post('/cart/addMultiCart', async (req: Request, res: Response) => {
        outFunction(res, addMultiProductTobag(req.body, res.locals.userId))
    })
}

export function sellerSctionForCart(route: Router) {
    route.get('/cart/data', async (_req: Request, res: Response) => {
        outFunction(res, sellerCart(res.locals.userId))
    })
    route.put('/cart/addNote/:id', async (req: Request, res: Response) => {
        let temp: IProgressNote = req.body
        temp.progress = (<any>paymentProgress)[req.body.progress]
        // console.log("data from it ", temp)
        outFunction(res, addProgress(req.params.id, temp))
    })
    route.put('/cart/updateDelivaryDate/:id',
        async (req: Request, res: Response) => {
            outFunction(res, addDelivaryDate(req.params.id, req.body.date))
        })

}


// route.get('/adminView',async (_req:Request, res: Response) => {
//     await outFunction(res, async () => await adminView())
// })

// route.get('/customerCart/:id', async (req:Request, res: Response) => {
//     await outFunction(res, async () => await readCart(req.params.id))
// })

// route.get('/sellerCart/:id',async (req:Request, res: Response) => {
//     await outFunction(res, async () => await sellerCart(req.params.id))
// })

// route.post('/customerCart', async (req:Request, res: Response) => {
//     await outFunction(res, async () => await createCart(req.body))
// })

// route.get('/payOrder/:id', async (req:Request, res: Response) => {
//     await outFunction(res, async () => await payment(req.params.id))
// })

// route.get('/cancellOrder/:id', async (req:Request, res: Response) => {
//     await outFunction(res, async () => await cancelPayment(req.params.id))
// })
// route.get('/delivared/:id', async (req:Request, res: Response) => {
//     await outFunction(res, async () => await compltedDelivary(req.params.id))
// })



