import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { boards, currentBoard, setCurrentBoard } = useContext(BoardsContext)

  function handleClick(){
    setIsOpen(!isOpen)
  }
  
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="relative h-screen flex flex-col ">
        <h1 className="px-6 mb-6 text-2xl text-white font-medium">Kanban</h1>
        <h3 className="px-6 mb-3 text-neutral-400">ALL BOARDS ({boards.length})</h3>
        <ul className="text-neutral-400">
          {boards && boards.map(board => {
            return (
              <li key={board.id} onClick={() => setCurrentBoard(board)} className={board === currentBoard? 'active' : ''}><NavLink to="/">{board.board_name}</NavLink></li>
            )
          })}
        </ul>
        <NavLink to="/create" className="px-6 mt-3 text-[#645FC6]">
          + Create New Board
        </NavLink>
        <button onClick={handleClick}>{isOpen? 'Hide sidebar' : 'Show Sidebar'}</button>
      </div>
    </aside>
  )
}
