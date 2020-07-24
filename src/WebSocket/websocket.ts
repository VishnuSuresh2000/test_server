
import { Application } from "express-ws";
import { changeStateSyncCategory, changeStateSyncSalles } from "../CustomStream/CheckDataChaged";



export default function syncWebSocket(app: Application): void {
    app.ws("/sync", (ws) => {
        console.log("Conected to Socket sync")
        var listener=(data:any)=> {
            console.log(`Data Lisern Cat ${data} `)
            if (data == "true") {
                ws.send("catogoryTrue")
            }
        }
        var listenerProduct=(data:any)=> {
            console.log(`Data Lisern Cat ${data} `)
            if (data == "true") {
                ws.send("sallesTrue")
            }
        }
        changeStateSyncCategory.addListener("data", listener )
        changeStateSyncSalles.addListener("data",listenerProduct)
        ws.on("close",()=>{
            console.log("DisConected to Socket sync")
            changeStateSyncCategory.removeListener("data",listener)
            changeStateSyncSalles.removeListener("data",listenerProduct)
        })
    })
}