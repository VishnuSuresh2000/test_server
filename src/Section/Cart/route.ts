// import { Router, Response, Request } from 'express'
// import { outFunction } from '../functions'
// import { readCart, createCart, payment, cancelPayment, sellerCart, compltedDelivary, adminView } from './function'

// var route = Router()

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


// export default route
