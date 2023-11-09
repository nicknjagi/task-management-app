import React, { useContext} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'

export default function Navbar() {
  const { boards, currentBoard, setCurrentBoard } = useContext(BoardsContext)
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(e){
    if (e.target.value === 'create'){
      navigate('/create')
      return
    }
    const curr = boards.filter(board => board.board_name === e.target.value)[0]
    setCurrentBoard(curr)
    navigate('/')
  }

  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 w-full p-6 flex items-center justify-between text-white">
      <div>
        <h2 className="hidden md:inline-block">{location.pathname === '/create' ? 'Create Board' :currentBoard.board_name}</h2>
        <select
          name="board"
          id="board"
          className="border-0 md:hidden"
          value={location.pathname === '/create' ? 'Create Board' :currentBoard.board_name}
          onChange={handleChange}>
          {boards &&
            boards.map((board) => {
              return (
                <option
                  key={board.id}
                  className={board === currentBoard ? 'bg-[#645FC6]' : ''}
                  value={board.board_name}>
                  {board.board_name}
                </option>
              )
            })}
          <option value="create">
              + Create New Board
          </option>
        </select>
      </div>
      <NavLink to="/add" className="md:px-3 md:py-2 bg-[#645FC6] hover:bg-violet-800 rounded-3xl transition">
        <span title='Add a task' className='p-4 md:p-0'> + </span> <span className="hidden md:inline">Add New Task</span>
      </NavLink>
    </header>
  )
}
