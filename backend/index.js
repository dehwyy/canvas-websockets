import express from 'express'
import eWs from 'express-ws'
import cors from "cors"
import * as fs from "fs";
import * as path from "path";

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())

const aWss = eWs(app).getWss()
const PORT = process.env.PORT || 727


app.post("/img", (req, res) => {
    try {
        const dt = req.body.img.split(",")[1]
        fs.writeFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`), dt, "base64", {recursive: true})
        return res.json("file uploaded")
    } catch (e) {
        return res.status(500).json({message: `${e}: status code - 500: error`})
    }
})
app.get("/img", (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString("base64")
        res.json(data)
    } catch (e) {
        return res.status(500).json({message: `${e}: status code - 500: error`})
    }
})

app.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        const message = JSON.parse(msg)
        switch (message.method) {
            case "connection":
                connectionHandler(ws, message)
                break
            case "updateActions":
                updateActionsHandler(ws, message)
                break
            default:
                broadcastConnection(ws, message)
                break
        }
    })
})

const connectionHandler = (ws, message) => {
    ws.id = message.id
    ws.undoActions = []
    ws.redoActions = []
    broadcastConnection(ws, message)
}

const updateActionsHandler = (ws, message) => {
    switch (message.type) {
        case "add":
            aWss.clients.forEach(client => {
                if (client.id === message.id) {
                    client.undoActions.push(message.img)
                }
            })
            break
        case "undo":
            aWss.clients.forEach(client => {
                if (client.id === message.id) {
                    const img = client.undoActions.pop()
                    client.redoActions.push(message.img)
                    client.send(JSON.stringify({
                        method: "updateActions",
                        img
                    }))
                }
            })
            break
        case "redo":
            aWss.clients.forEach(client => {
                if (client.id === message.id) {
                    const img = client.redoActions.pop()
                    client.undoActions.push(message.img)
                    client.send(JSON.stringify({
                        method: "updateActions",
                        img
                    }))
                }
            })
            break
    }
}

const broadcastConnection = (ws, message) => {
    aWss.clients.forEach(client => {
        if (client.id === message.id) {
            client.send(JSON.stringify(message))
        }
    })
}

const startApp = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
startApp()