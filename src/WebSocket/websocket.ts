import { Server } from "http";
import WebSocket from "ws";
import changeState from "../CustomStream/CheckDataChaged";

export default async function setUpWebSocket(server: Server) {
    var socket = new WebSocket.Server({ server: server, path: '/category' },)
    socket.on('connection', async function connection(ws) {
        console.log("connected client")
        changeState.on("data", (chunk) => {
            console.log(`From Stream ${chunk}`)
            ws.send(chunk)
        })
    });
}