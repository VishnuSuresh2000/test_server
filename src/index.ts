import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import dbconnection from './DataBase/connection'
import route_category from './Section/Category/route'
import customer from "./Section/Profiles/Customer/route"
import setUpWebSocket from './WebSocket/websocket'

dbconnection()

var app: Application = express()
var server=app.listen(process.env.PORT||80, () => {
    console.log("http://localhost:80") 
    
})
setUpWebSocket(server)
app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}))
app.use(bodyParser.json({
    limit: '10mb'
}))
app.use('/customer', customer)
app.use('/category', route_category)


app.get('/', (_req: Request, res: Response) => {
    res.send("Test Sections")
})

app.get('/test', (_req: Request, res: Response) => {
    res.send("test section")
})











