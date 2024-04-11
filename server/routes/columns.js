const express = require('express')
const router = express.Router()

const {
  getAllColumns,
  createColumn,
  getColumn,
  updateColumn,
  deleteColumn,
} = require('../controllers/columns')

router.route('/').get(getAllColumns).post(createColumn)
router.route('/:id').get(getColumn).patch(updateColumn).delete(deleteColumn)

module.exports = router
