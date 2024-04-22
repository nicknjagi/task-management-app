const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const notFound = require('./middleware/not_found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()
const boards = require('./routes/boards')
const tasks = require('./routes/tasks')
const columns = require('./routes/columns')
const subtasks = require('./routes/subtasks')
const users = require('./routes/users')

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/v1/boards', boards)
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/columns', columns)
app.use('/api/v1/subtasks', subtasks)
app.use('/api/v1/users', users)

app.get('/', (req,res) => {
    res.status(200).send('Kanban task management API')
})

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

app.listen(port, console.log(`server is listening on port ${port}`))