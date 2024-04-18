const prisma = require('../db/connect')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllBoards = asyncWrapper(async (req, res) => {
  const boards = await prisma.board.findMany({
    // include: {
    //   columns: {
    //     include:{
    //       tasks:{
    //         include: {
    //           subtasks:true
    //         }
    //       }
    //     }
    //   }
    // }
  })
  res.status(200).json({ boards })
})

const createBoard = asyncWrapper(async (req, res) => {
  const {columns, boardName, userId} = req.body
  console.log(boardName);
  if(columns.length > 0){
    const board = await prisma.board.create({
      data: {
        boardName,
        columns: {
          create: columns
        },
        userId
      }
    })
    return res.status(201).json({ board })
  }
    const board = await prisma.board.create({
      data:{
        boardName,
        userId
      }
    })
    return res.status(201).json({ board })
})

const getBoard = asyncWrapper(async (req, res, next) => {
    const { id: boardID } = req.params
    console.log(boardID);
    const board = await prisma.board.findUnique({
      where: { 
        id: Number(boardID )
      }
    })
    if (!board) {
      return next(createCustomError(`No board with id: ${boardID}`, 404))
    }
    res.status(200).json({ board })
})

const updateBoard = asyncWrapper(async (req, res) => {
    const { id: boardID } = req.params
    const board = await prisma.board.update({
      where: {
        id: Number(boardID)
      },
      data: req.body
    })
    res.status(200).json({ board })
})

const deleteBoard = asyncWrapper(async (req, res, next) => {
    const { id: boardID } = req.params
    const exists = await prisma.board.findUnique({
      where: { 
        id: Number(boardID )
      }
    })

    if (!exists) {
      return next(createCustomError(`No board with id: ${boardID}`, 404))
    }

    const board = await prisma.board.delete({
      where: {
        id: Number(boardID)
      }
    })
    
    res.status(204).json({ board })
})

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
}
