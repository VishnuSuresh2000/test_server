
import { Application } from "express-ws";
import { changeStateSyncCategory, changeStateSyncSalles } from "../CustomStream/CheckDataChaged";



export default function syncWebSocket(app: Application): void {
    app.ws("/sync", (ws) => {
        var listener=(data:any)=> {
   
            if (data == "true") {
                ws.send("catogoryTrue")
            }
        }
        var listenerProduct=(data:any)=> {
        
            if (data == "true") {
                ws.send("sallesTrue")
            }
        }
        changeStateSyncCategory.addListener("data", listener )
        changeStateSyncSalles.addListener("data",listenerProduct)
        ws.on("close",()=>{

            changeStateSyncCategory.removeListener("data",listener)
            changeStateSyncSalles.removeListener("data",listenerProduct)
        })
    })
}