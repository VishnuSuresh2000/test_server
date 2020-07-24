import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import expressWs from 'express-ws'
import dbconnection from './DataBase/connection'
import allRoutesBeru from './Route/AllRouteBeru'
import syncWebSocket from './WebSocket/websocket'


dbconnection()
var wsApp=expressWs(express())
var app = wsApp.app
app.listen(process.env.PORT || 80, () => {
    console.log("http://localhost:80")
})

app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}))
app.use(bodyParser.json({
    limit: '10mb'
}))
allRoutesBeru(app)

app.get('/', (_req: Request, res: Response) => {
    res.send("Test Sections")
})

app.get('/test', (_req: Request, res: Response) => {
    res.send("test section")
})

syncWebSocket(app)












