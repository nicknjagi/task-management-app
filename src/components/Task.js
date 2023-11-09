import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'

export default function Task({task, doneSubtasks}) {
  const {setCurrentTask} = useContext(BoardsContext)
  
  return (
    <div className="task" onClick={()=> setCurrentTask(task)}>
      <NavLink to={`/${task.id}`} >
        <h3 className="text-white capitalize font-semibold">{task.title}</h3>
        <p>{doneSubtasks} of {task.subtasks.length} subtasks</p>
      </NavLink>
    </div>
  )
}
