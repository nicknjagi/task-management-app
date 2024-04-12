import React, { useState} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import elipsis from '../assets/images/ellipsis-vertical.svg'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const {currentBoard, boards} = useSelector(state => state.board)
  const [showDelete, setShowDelete] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 w-full p-6 md:pl-10 flex items-center justify-between text-white">
      <div>
        <h2 className="hidden md:inline-block">
          {location.pathname === '/board/create'
            ? 'Create Board'
            : currentBoard.boardName}
        </h2>
        <select
          name="board"
          id="board"
          className="border-0 md:hidden"
          value={
            location.pathname === '/board/create'
              ? 'Create Board'
              : currentBoard.boardName
          }
          // onChange={handleChange}
          >
          {boards &&
            boards.boards.map((board) => {
              return (
                <option
                  key={board.id}
                  className={board === currentBoard ? 'bg-[#645FC6]' : ''}
                  value={board.boardName}>
                  {board.boardName}
                </option>
              )
            })}
          <option value="create">+ Create New Board</option>
        </select>
      </div>
      <div className="relative flex gap-4 justify-between items-center">
        <NavLink
          to="/task/add"
          className="md:px-3 md:py-2 bg-[#645FC6] hover:bg-violet-800 rounded-3xl transition">
          <span title="Add a task" className="p-4 md:p-0">
            {' '}
            +{' '}
          </span>{' '}
          <span className="hidden md:inline">Add New Task</span>
        </NavLink>
        <button
          type="button"
          className="w-6"
          aria-label="options"
          // onClick={handleClick}
          >
          <img src={elipsis} alt="delete icon" />
        </button>
        {showDelete && (
          <button
            type="button"
            className="absolute right-3 -bottom-10 w-32 py-1 px-2 bg-red-500 hover:bg-red-600 rounded-md"
            // onClick={() => deleteBoard(currentBoard.id)}
            >
            Delete board
          </button>
        )}
      </div>
    </header>
  )
}
