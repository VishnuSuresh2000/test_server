import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import expressWs from 'express-ws'
import dbconnection from './DataBase/connection'
import checkIfAuthenticated from './MiddleWare/Auth/auth'
import allRoutesBeru from './Route/AllRouteBeru'
import syncWebSocket from './WebSocket/websocket'


dbconnection()
var wsApp=expressWs(express())
var app = wsApp.app
app.listen(process.env.PORT || 80, () => {
    console.log("http://localhost:80")
})

app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token","authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}))
app.use(bodyParser.json({
    limit: '10mb'
}))
allRoutesBeru(app)

// app.use(function(req:Request,res:Response,next:NextFunction){
//     var temp = res.send
//     res.send = function() {
//         console.log(`do something..`);
//         temp.apply(this);
//     }
//     next()
// })

app.get('/', (_req: Request, res: Response) => {
    res.locals.test="test"
    res.send("Test Sections")
})

app.get('/test',checkIfAuthenticated, (_req: Request, res: Response) => {
    res.send(`test section ${res.locals.isAdmin}`)
})

syncWebSocket(app)












