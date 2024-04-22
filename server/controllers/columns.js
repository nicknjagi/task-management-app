const prisma = require('../db/connect')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllColumns = asyncWrapper(async (req, res) => {
  const {boardId} = req.params
  const columns = await prisma.column.findMany({
    where: {
      boardId: Number(boardId)
    },
    include:{
      tasks:{
        include:{
          subtasks:{
            orderBy: {
              id: 'asc'
            }
          }
        }
      }
    }
  })
  res.status(200).json({ columns })
})

const createColumn = asyncWrapper(async (req, res) => {
    const column = await prisma.column.create({
      data: req.body
    })
    res.status(201).json({ column })
})

const getColumn = asyncWrapper(async (req, res, next) => {
    const { columnId } = req.params
    const column = await prisma.column.findUnique({
      where: { 
        id: Number(columnId )
      }
    })
    if (!column) {
      return next(createCustomError(`No column with id: ${columnId}`, 404))
    }
    res.status(200).json({ column })
})

const updateColumn = asyncWrapper(async (req, res) => {
    const { id: columnID } = req.params
    const column = await prisma.column.update({
      where: {
        id: Number(columnID)
      },
      data: req.body
    })
    res.status(200).json({ column })
})

const deleteColumn = asyncWrapper(async (req, res, next) => {
    const { id: columnID } = req.params
    const exists = await prisma.column.findUnique({
      where: { 
        id: Number(columnID )
      }
    })

    if (!exists) {
      return next(createCustomError(`No column with id: ${columnID}`, 404))
    }

    const column = await prisma.column.delete({
      where: {
        id: Number(columnID)
      }
    })
    
    res.status(204).json({ column })
})

module.exports = {
  getAllColumns,
  createColumn,
  getColumn,
  updateColumn,
  deleteColumn,
}
