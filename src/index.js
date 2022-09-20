require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser");
const { queue } = require("./jobs");

const app = express()
app.use(bodyParser.json())

app.get("/", (_, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send({
        status: "ok"
    })
})

app.post("/", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    queue.add({ name: req.body.name, email: req.body.email, password: Date.now() })
    res.send({
       status: "ok",
       data: {
           message: `An email will be sent to ${req.body.email}`
       }
    })
})

app.listen(3000, () => console.log("Server on at http://localhost:3000/"))
