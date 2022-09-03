const express = require('express')
const fs = require('fs')
const PORT = 5000

const app = express()
const data = fs.readFileSync('users.json')
const users = JSON.parse(data)

app.use(express.json())

app.get('/user/all', (req, res) => {
    const { limit } = req.query
    if (limit) {
        res.send(users.slice(0, limit))
    } else {
        res.send(users)
    }
})

app.get('/user/random', (req, res) => {
    const random = Math.round(Math.random()*100)
    res.send(users[random])
})

app.post('/user/save', (req, res) => {
    const newUser = req.body
    const {photoUrl, name, gender, contact, address} = newUser
    if(!photoUrl){
        return res.status(422).send("Please provide a photoUrl of the user")
    }
    if(!name){
        return res.status(422).send("Please provide a name of the user")
    }
    if(!gender){
        return res.status(422).send("Please provide a gender of the user")
    }
    if(!contact){
        return res.status(422).send("Please provide a contact info of the user")
    }
    if(!address){
        return res.status(422).send("Please provide a address info of the user")
    }

    newUser.id = users.length + 1
    const newUsers = [...users, newUser]

    fs.writeFileSync('users.json', JSON.stringify(newUsers))

    res.status(200).send({
        message: "New User Added",
        newUser
    })
})

app.get('/', (req, res) => {
    res.send("Hello from random user api by Kamrul Saad!")
})

app.listen(PORT, () => {
    console.log("server is running");
})