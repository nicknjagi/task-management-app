import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  
  function handleClick(){
    setIsOpen(!isOpen)
  }
  
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="relative h-screen flex flex-col ">
        <h1 className="px-6 mb-6 text-2xl text-white font-medium">Kanban</h1>
        <h3 className="px-6 mb-3 text-neutral-400">ALL BOARDS (3)</h3>
        <ul className="text-neutral-400">
          <li className="active">Platform Launch</li>
          <li>Marketing Plan</li>
          <li>Roadmap</li>
        </ul>
        <NavLink to="/create" className="px-6 mt-3 text-[#645FC6]">
          + Create New Board
        </NavLink>
        <button onClick={handleClick}>view</button>
      </div>
    </aside>
  )
}
