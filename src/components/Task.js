import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Task() {
  return (
    <div className="task">
      <NavLink to="/:id" >
        <h3 className="text-white font-semibold">Build UI for onboarding flow</h3>
        <p>0 of 3 subtasks</p>
      </NavLink>
    </div>
  )
}
