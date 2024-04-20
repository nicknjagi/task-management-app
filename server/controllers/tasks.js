const prisma = require('../db/connect')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await prisma.task.findMany({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const {columnId, title, description,subtasks, userId} = req.body

  if(subtasks.length > 0){
    const task = await prisma.task.create({
      data: {
        title,
        description,
        subtasks: {
          create: subtasks
        },
        userId: Number(userId),
        columnId: Number(columnId)
      }
    })
    return res.status(201).json({ task })
  }

  const task = await prisma.task.create({
    data:{
      title,
      description,
      userId: Number(userId),
      columnId: Number(columnId)
    }
  })
  return res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await prisma.task.findUnique({
      where: { 
        id: Number(taskID )
      }
    })
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await prisma.task.update({
      where: {
        id: Number(taskID)
      },
      data: req.body
    })
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const exists = await prisma.task.findUnique({
      where: { 
        id: Number(taskID )
      }
    })

    if (!exists) {
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }

    const task = await prisma.task.delete({
      where: {
        id: Number(taskID)
      }
    })
    
    res.status(204).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
