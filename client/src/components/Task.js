import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Task({task, doneSubtasks}) {  
  return (
      <NavLink to={`/task/${task.id}`} className='task' draggable>
        <h3 className="text-white capitalize font-semibold">{task.title}</h3>
        <p>{doneSubtasks} of {task.subtasks.length} subtasks</p>
      </NavLink>
  )
}
