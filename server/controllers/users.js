const prisma = require('../db/connect')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await prisma.user.findMany({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
    const user = await prisma.user.create({
      data: req.body
    })
    res.status(201).json({ user })
})

const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await prisma.user.findUnique({
      where: { 
        id: Number(userID )
      }
    })
    if (!user) {
      return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ user })
})

const updateUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params
    const user = await prisma.user.update({
      where: {
        id: Number(userID)
      },
      data: req.body
    })
    res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const exists = await prisma.user.findUnique({
      where: { 
        id: Number(userID )
      }
    })

    if (!exists) {
      return next(createCustomError(`No user with id: ${userID}`, 404))
    }

    const user = await prisma.user.delete({
      where: {
        id: Number(userID)
      }
    })
    
    res.status(204).json({ user })
})

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
