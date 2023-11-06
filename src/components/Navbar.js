import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <h2>Platform Launch</h2>
      <NavLink to='/add'>Add New Task</NavLink>
    </header>
  )
}
