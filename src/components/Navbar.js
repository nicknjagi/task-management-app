import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 p-6 flex items-center justify-between text-white">
      <h2>Platform Launch</h2>
      <NavLink to="/add" className="px-3 py-2 bg-[#645FC6] rounded-3xl">
        + Add New Task
      </NavLink>
    </header>
  )
}
