import React, { useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'

export default function Navbar() {
  const {currentBoard} = useContext(BoardsContext)

  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 w-full p-6 flex items-center justify-between text-white">
      <h2>{currentBoard.board_name}</h2>
      <NavLink to="/add" className="px-3 py-2 bg-[#645FC6] rounded-3xl">
        + Add New Task
      </NavLink>
    </header>
  )
}
