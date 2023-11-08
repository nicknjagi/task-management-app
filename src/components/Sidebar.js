import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, currentBoard, setCurrentBoard } = useContext(BoardsContext)

  function handleClick(){
    setIsOpen(!isOpen)
  }
  
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="relative h-screen flex flex-col ">
        <h1 className="px-6 mb-6 text-2xl text-white font-medium">Kanban</h1>
        <h3 className="px-6 mb-3 text-neutral-400">ALL BOARDS (3)</h3>
        <ul className="text-neutral-400">
          {data && data.map(board => {
            return (
              <li onClick={() => setCurrentBoard(board)} className={board === currentBoard? 'active' : ''}>{board.board_name}</li>
            )
          })}
        </ul>
        <NavLink to="/create" className="px-6 mt-3 text-[#645FC6]">
          + Create New Board
        </NavLink>
        <button onClick={handleClick}>view</button>
      </div>
    </aside>
  )
}
