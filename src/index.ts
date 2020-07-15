import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dbconnection from './DataBase/connection'
import customer from "./Section/Profiles/Customer/route"
import bodyParser from 'body-parser'
dbconnection()

var app:Application=express()
app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}))
app.use(bodyParser.json({
    limit: '10mb'
}))
app.use('/customer',customer)


// app.use((req:Request,res:Response,next:NextFunction)=>{
//     res.locals.test="test"
//     next()
// })


// app.get('/',(req:Request,res:Response)=>{
//     console.log(res.locals.test)
//     res.send("token test section")
// })

app.get('/',(_req:Request,res:Response)=>{
    res.send("test section")
})

app.listen(80,()=>{
    console.log("http://localhost:80")
})