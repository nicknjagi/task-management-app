const express = require('express')
const router = express.Router()

const {
  getAllSubtasks,
  createSubtask,
  getSubtask,
  updateSubtask,
  deleteSubtask,
} = require('../controllers/subtasks')

router.route('/').get(getAllSubtasks).post(createSubtask)
router.route('/:id').get(getSubtask).patch(updateSubtask).delete(deleteSubtask)

module.exports = router
