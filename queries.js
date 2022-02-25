const Pool = require('pg').Pool
require('dotenv').config()
const connectionString = process.env.connectionString
const pool = new Pool({
    connectionString,
    ssl: {rejectUnauthorized : false}
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserByName = (req, res) => {
    const name = String(req.params.name)
    pool.query('SELECT level FROM users WHERE username = $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name} = req.body
    let level = "1"
    pool.query('INSERT INTO users (username, level) VALUES ($1, $2)', [name, level], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with username: ${name}`)
    })
}

const updateUser = (req, res) => {
    const name = String(req.params.name)
    const {choice} = req.body
    pool.query(
        'UPDATE users SET level = level || $1 where username = $2',
        [choice, name],
        (error, results) => {
            if(error) {
                throw error
            }
            res.status(200).send(`Level updated for user: ${name}`)
        }
    )
}


const resetUser = (req, res) => {
    const name = String(req.params.name)
    pool.query(
        'UPDATE users SET level = 1 where username = $1',
        [name],
        (error, results) => {
            if(error) {
                throw error
            }
            res.status(200).send(`Game restarted for ${name}`)
        }
    )
}

module.exports = {
    getUsers,
    getUserByName,
    createUser,
    updateUser,
    resetUser,
}