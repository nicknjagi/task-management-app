const prisma = require('../db/connect')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllSubtasks = asyncWrapper(async (req, res) => {
  const subtasks = await prisma.subtask.findMany({})
  res.status(200).json({ subtasks })
})

const createSubtask = asyncWrapper(async (req, res) => {
    const subtask = await prisma.subtask.create({
      data: req.body
    })
    res.status(201).json({ subtask })
})

const getSubtask = asyncWrapper(async (req, res, next) => {
    const { id: subtaskID } = req.params
    const subtask = await prisma.subtask.findUnique({
      where: { 
        id: Number(subtaskID )
      }
    })
    if (!subtask) {
      return next(createCustomError(`No subtask with id: ${subtaskID}`, 404))
    }
    res.status(200).json({ subtask })
})

const updateSubtask = asyncWrapper(async (req, res) => {
    const { id: subtaskID } = req.params
    const {completed} = req.body
    console.log(completed);
    const subtask = await prisma.subtask.update({
      where: {
        id: Number(subtaskID)
      },
      data: req.body
    })
    res.status(200).json({ subtask })
})

const deleteSubtask = asyncWrapper(async (req, res, next) => {
    const { id: subtaskID } = req.params
    const exists = await prisma.subtask.findUnique({
      where: { 
        id: Number(subtaskID )
      }
    })

    if (!exists) {
      return next(createCustomError(`No subtask with id: ${subtaskID}`, 404))
    }

    const subtask = await prisma.subtask.delete({
      where: {
        id: Number(subtaskID)
      }
    })
    
    res.status(204).json({ subtask })
})

module.exports = {
  getAllSubtasks,
  createSubtask,
  getSubtask,
  updateSubtask,
  deleteSubtask,
}
