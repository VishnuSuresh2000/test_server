import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import expressWs from 'express-ws'
import dbconnection from './DataBase/connection'
import checkIfAuthenticated from './MiddleWare/Auth/auth'
// import allRoutesBeru from './Route/AllRouteBeru'
import syncWebSocket from './WebSocket/websocket'
import route_category from './Section/Category/route'
import customer from "./Section/Profiles/Customer/route"
import seller from "./Section/Profiles/Seller/route";
import product from "./Section/Product/route"
import farmer from "./Section/Profiles/Farmer/route";
import { route } from "./Section/Cart/route";

import { router } from './Section/Salles/route';

dbconnection()
var wsApp = expressWs(express())
var app = wsApp.app

app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,

}))
app.use(bodyParser.json({
    limit: '10mb'
}))
// allRoutesBeru(app)

app.use('/customer', customer)
app.use('/category', route_category)
app.use('/seller', seller)
app.use('/product', product)
app.use('/farmer', farmer)
app.use('/salles', router)
app.use('/cart', route)

// app.use(function(req:Request,res:Response,next:NextFunction){
//     var temp = res.send
//     res.send = function() {
//         console.log(`do something..`);
//         temp.apply(this);
//     }
//     next()
// })

app.get('/', (_req: Request, res: Response) => {
    res.locals.test = "test"
    res.send("Test Sections")
})
// app.get('/testPdf', (_req: Request, res: Response) => {
//     console.log("on test pdf")
//     invoiceTest(res)
// })

app.get('/test', checkIfAuthenticated, (_req: Request, res: Response) => {
    res.send(`test section ${res.locals.isAdmin}`)
})

syncWebSocket(app)

app.listen(5000, () => {
    console.log("http://localhost:5000")
})











