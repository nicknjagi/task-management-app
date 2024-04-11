import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

export default function CreateBoard() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function handleChange(e){
    setName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

  }
  return (
    <section className="section">
      <BackButton />
      <form className="add-task-form max-w-[500px]">
        <h2>Create new board</h2>
        <div className="flex flex-col gap-6">
          <div className="form-row">
            <label htmlFor="board-name">Board name</label>
            <input
              type="text"
              id="board-name"
              name="board-name"
              placeholder="e.g. User Engagement Survey"
              value={name}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="create-task-btn bg-btn-purple hover:bg-violet-800 transition"
            onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
