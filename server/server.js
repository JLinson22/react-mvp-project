import express from 'express';
import postgres from 'postgres';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const sql = postgres(process.env.DATABASE_URL)
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.get('/todos', async (req, res) => {
    try {
        const todos = await sql`SELECT * FROM todos`
        res.json(todos)
    } catch(error) {
        res.json(error)
    }
})

app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const oneTodo = await sql`SELECT * FROM todos WHERE id = ${id}`
        res.json(oneTodo)
    } catch (error) {
        res.json(error)
    }
}) 

app.post('/todos', async (req, res) => {
    try {
        const {content, completed} = req.body
        const newTodo = await sql`INSERT INTO todos (content, completed) VALUES (${content}, ${completed}) returning content, completed`
        res.json(newTodo)
    } catch (error) {
        res.json(error)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {content, completed} = req.body
        const updatedTodo = await sql`UPDATE todos SET content = ${content}, completed = ${completed} WHERE id = ${id}`
        res.json(updatedTodo)
    } catch (error) {
        res.json(error)
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deletedTodo = await sql`DELETE FROM todos WHERE id = ${id}`
        res.json(deletedTodo)
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, console.log(`server running on port ${PORT}`))