import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { createBoard } from '../features/board/boardSlice'
import { useDispatch } from 'react-redux'

export default function CreateBoard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const task = Object.fromEntries(formData.entries())
    task['userId'] = 1

    if(task.boardName !== ''){
      dispatch(createBoard(task))
    }
  }

  return (
    <section className="section">
      <BackButton />
      <form onSubmit={handleSubmit} className="add-task-form max-w-[500px]">
        <h2>Create new board</h2>
        <div className="flex flex-col gap-6">
          <div className="form-row">
            <label htmlFor="boardName">Board name</label>
            <input
              type="text"
              id="boardName"
              name="boardName"
              placeholder="e.g. User Engagement Survey"
            />
          </div>
          <button
            className="create-task-btn bg-btn-purple hover:bg-violet-800 transition"
          >
            Create board
          </button>
        </div>
      </form>
    </section>
  )
}
