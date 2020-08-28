
import { Application } from "express-ws";
import { changeStateSyncCart, changeStateSyncCategory, changeStateSyncSalles } from "../CustomStream/CheckDataChaged";

export default function syncWebSocket(app: Application): void {
    app.ws("/sync", (ws) => {
        var listener = (data: any) => {

            if (data == "true") {
                ws.send("catogoryTrue")
            }
        }
        var listenerProduct = (data: any) => {

            if (data == "true") {
                ws.send("sallesTrue")
            }
        }
        var listenerCart = (data: any) => {

            if (data == "true") {
                ws.send("cartTrue")
            }
        }
        changeStateSyncCategory.addListener("data", listener)
        changeStateSyncSalles.addListener("data", listenerProduct)
        changeStateSyncCart.addListener("data", listenerCart)
        ws.on("close", () => {
            changeStateSyncCart.removeListener("data", listenerCart)
            changeStateSyncCategory.removeListener("data", listener)
            changeStateSyncSalles.removeListener("data", listenerProduct)
        })
    })
}