import React, { useEffect, useState} from 'react'
import { NavLink, useNavigate, useParams} from 'react-router-dom'
import elipsis from '../assets/icons/ellipsis-vertical-circle-outline.svg'

export default function TaskDetail() {
  const [currentTask, setCurrentTask] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://task-management-app-ibvr.onrender.com/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask(data)
        setIsLoading(false)
      })
    
  }, [params.id])

  function handleCheckbox(el){
    const updatedSubtasks = currentTask.subtasks.map(task => {
      console.log(task.completed);
      if(task.subtask_id === el.subtask_id){
        return task.completed ? {...task,completed:false}:{...task,completed:true}
      }else{
        return task
      }
    })
    console.log(updatedSubtasks);
    setCurrentTask({...currentTask,subtasks:updatedSubtasks})
  }

  function changeStatus(e){
    setCurrentTask({...currentTask,status:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`https://task-management-app-ibvr.onrender.com/tasks/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentTask),
    })
    navigate('/')
  }

  if(isLoading) return <h1>Loading...</h1>

  const { title, description, status, subtasks } = currentTask
  const doneTasks = subtasks.filter(
    (el) => el.completed === true
  ).length

  return (
    <section className="flex flex-col justify-start p-4 mx-2 mt-6 rounded-lg text-white w-full ">
      <NavLink to="/">Back</NavLink>
      <form className="p-6 mt-6 mx-auto bg-[#2C2C38] rounded-lg text-white w-full max-w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg ">{title}</h2>
          <button type='button' className='w-6' aria-label='options'><img src={elipsis} alt="delete icon" /></button>
        </div>
        <p className="text-neutral-400 mb-6">{description}</p>
        <h3>
          Subtasks({doneTasks} of {subtasks.length})
        </h3>
        {subtasks.map((subtask) => {
          return (
            <div className="subtasks my-2 p-3 rounded-md flex gap-4 bg-[#21212D]">
              <input
                type="checkbox"
                name="subtask"
                id={subtask.id}
                checked={subtask.completed}
                value={subtask.completed}
                onChange={() => handleCheckbox(subtask)}
              />
              <label
                htmlFor={subtask.id}
                className={
                  subtask.completed ? 'text-neutral-500 line-through' : ''
                }>
                {subtask.subtask}
              </label>
            </div>
          )
        })}
        <div className="form-row mt-6">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={changeStatus}>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 rounded-3xl bg-btn-purple hover:bg-violet-800 transition"
          onClick={handleSubmit}
          value="Submit">
          Create Task
        </button>
      </form>
    </section>
  )
}
