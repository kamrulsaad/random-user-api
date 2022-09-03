const express = require('express')
const fs = require('fs')
const PORT = 5000

const app = express()

app.get('/user/all', async (req, res) => {
    const data = fs.readFileSync('users.json')
    const users = JSON.parse(data)

    const { limit } = req.query

    if (limit) {
        res.send(users.slice(0, limit))
    } else {
        res.send(users)
    }
})

app.get('/', (req, res) => {
    res.send("Hello from random user api by Kamrul Saad!")
})

app.listen(PORT, () => {
    console.log("server is running");
})