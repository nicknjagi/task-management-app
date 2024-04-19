import React from 'react'
import BackButton from '../components/BackButton'
import { createBoard } from '../features/board/boardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export default function UpdateBoard() {
  const {currentBoard, updatingBoard} = useSelector(state => state.board)
  const dispatch = useDispatch()
  const {id} = useParams()

  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const board = Object.fromEntries(formData.entries())

    if(board.boardName.trim() === ''){
      toast.error('Board name cannot be empty')
      return
    }
    dispatch(createBoard(id))
  }

  return (
    <section className="section">
      <BackButton />
      <form onSubmit={handleSubmit} className="add-task-form max-w-[500px]">
        <h2>Update board</h2>
        <div className="flex flex-col gap-6">
          <div className="form-row">
            <label htmlFor="boardName">Name</label>
            <input
              type="text"
              id="boardName"
              name="boardName"
              placeholder="e.g. User Engagement Survey"
              defaultValue={currentBoard?.boardName}
              required
            />
          </div>
          <button
            className="button capitalize bg-main-purple hover:bg-opacity-80 transition"
          >
            {updatingBoard ? 'updating...' : 'update board'}
          </button>
        </div>
      </form>
    </section>
  )
}
