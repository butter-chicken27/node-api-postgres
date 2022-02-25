const express = require('express')
const db = require('./queries')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Nodegay, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:name', db.getUserByName)
app.post('/users', db.createUser)
app.put('/users/:name', db.updateUser)
app.put('/users/reset/:name', db.resetUser)

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running`)
})
