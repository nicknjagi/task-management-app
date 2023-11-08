import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Task({task, doneSubtasks}) {

  
  return (
    <div className="task">
      <NavLink to={`/${task.task_id}`} >
        <h3 className="text-white capitalize font-semibold">{task.title}</h3>
        <p>{doneSubtasks} of {task.subtasks.length} subtasks</p>
      </NavLink>
    </div>
  )
}
