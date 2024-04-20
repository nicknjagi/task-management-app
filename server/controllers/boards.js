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
    const {boardName, columns, colsToDelete} = req.body

    if(colsToDelete.length > 0){
      const boards = await prisma.column.deleteMany({
        where: {
          id: {
            in: colsToDelete
          }
        }
      })
    }

    if(columns.length > 0) {
      const updatedColumns = [];
      for (const column of columns) {
          if (column.id) {
              // Column has an ID, update it
              const { id, name, color } = column;
              const updatedColumn = await prisma.column.update({
                  where: { id },
                  data: { name, color }
              });
              updatedColumns.push(updatedColumn);
          } else {
              // Column doesn't have an ID, create it
              const { name} = column;
              const newColumn = await prisma.column.create({
                  data: { name, boardId: Number(boardID) }
              });
          }
      }

        // Update the board with the new boardName and the updated columns
        const board = await prisma.board.update({
            where: {
                id: Number(boardID)
            },
            data: {
                boardName,
                columns: {
                    connect: updatedColumns.map(column => ({ id: column.id })) // Connect the updated columns to the board
                }
            }
        });

        return res.status(200).json({ board });
    }
    const board = await prisma.board.update({
      where: {
        id: Number(boardID)
      },
      data: {
        boardName
      }
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
