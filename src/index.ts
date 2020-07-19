import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import WebSocket from 'ws'
import changeState from './CustomStream/CheckDataChaged'
import dbconnection from './DataBase/connection'
import route_category from './Section/Category/route'
import customer from "./Section/Profiles/Customer/route"

dbconnection()

var app: Application = express()
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

// app.use((req:Request,res:Response,next:NextFunction)=>{
//     res.locals.test="test"
//     next()
// })


// app.get('/',(req:Request,res:Response)=>{
//     console.log(res.locals.test)
//     res.send("token test section")
// })
app.get('/', (_req: Request, res: Response) => {
    res.send("Test Sections")
})



app.get('/test', (_req: Request, res: Response) => {
    res.send("test section")
})




var server=app.listen(process.env.PORT||80, () => {
    console.log("http://localhost:80") 
    
})

var socket = new WebSocket.Server({server:server,path:'/test'},)
var num:number=0
socket.on('connection',async  function connection(ws) {
    ws.on('message',function incoming(message) {
        console.log('received: %s', message);
        
    });
    console.log("connected client")
    // setInterval(()=>{
    //     num=num+1
    //     ws.send(`from time interval step `)
    // },1000)
    changeState.on("data",(chunk)=>{
        
        ws.send(`From Stream ${chunk}`)
    })
});