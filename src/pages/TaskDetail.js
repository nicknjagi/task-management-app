import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import elipsis from '../assets/images/ellipsis-vertical-circle-outline.svg'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BoardsContext } from '../layouts/Layout'

export default function TaskDetail() {
  const [currentTask, setCurrentTask] = useState({})
  const [defaultTask, setDefaultTask] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const {setTasks, currentBoard} = useContext(BoardsContext)
  const params = useParams()
  const navigate = useNavigate()

  const MySwal = withReactContent(Swal) 

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://task-management-app-ibvr.onrender.com/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask(data)
        setDefaultTask(data)
        setIsLoading(false)
      })
    
  }, [params.id])

  function fetchTasks(){
    setIsLoading(true)
    fetch('https://task-management-app-ibvr.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.filter((task) => task.board_id === currentBoard.id))
        setIsLoading(false)
      })
  }

  function handleCheckbox(el){
    const updatedSubtasks = currentTask.subtasks.map(task => {
      if(task.subtask_id === el.subtask_id){
        return task.completed ? {...task,completed:false}:{...task,completed:true}
      }else{
        return task
      }
    })

    setCurrentTask({...currentTask,subtasks:updatedSubtasks})
  }

  function changeStatus(e){
    setCurrentTask({...currentTask,status:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    if (currentTask === defaultTask){
      navigate('/')
      return
    }
    fetch(`https://task-management-app-ibvr.onrender.com/tasks/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentTask),
    })
    .then(res=>{
      MySwal.fire({
        text: 'Task has been updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      fetchTasks()
      navigate('/')
    })
  }

  function handleClick(){
    setShowDelete(!showDelete)
  }

  function deleteTask(id){
    MySwal.fire({
      title: 'Do you want to delete the task?',
      showCancelButton: true,
      icon:'warning',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-management-app-ibvr.onrender.com/tasks/${params.id}`, {
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(()=>{
          Swal.fire('Task has been deleted!', '', 'success').then(() =>{
            fetchTasks()
            navigate('/')
          })
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  if(isLoading) return <Loader />

  const { title, description, status, subtasks } = currentTask
  const doneTasks = subtasks.filter(
    (el) => el.completed === true
  ).length

  return (
    <section className="section">
      <NavLink to="/">
        Back
      </NavLink>
      <form className="p-6 mt-6 mx-auto bg-[#2C2C38] rounded-lg text-white w-full max-w-[600px]">
        <div className="relative flex justify-between items-center mb-8">
          <h2 className="text-lg ">{title}</h2>
          <button type="button" className="w-6" aria-label="options" onClick={handleClick}>
            <img src={elipsis} alt="delete icon" />
          </button>
          {showDelete && <button type='button' className='absolute right-0 -bottom-8 py-1 px-2 bg-red-500 hover:bg-red-600 rounded-md' onClick={()=> deleteTask(params.id)}>Delete</button>}
        </div>
        <p className="text-neutral-400 mb-8">{description}</p>
        <h3>
          Subtasks({doneTasks} of {subtasks.length})
        </h3>
        {subtasks.map((subtask) => {
          return (
            <div
              key={subtask.subtask_id}
              className="subtasks my-2 p-3 rounded-md flex items-center gap-4 bg-[#21212D]">
              <input
                className="relative peer"
                type="checkbox"
                name={subtask.subtask_id}
                id={subtask.subtask_id}
                checked={subtask.completed}
                value={subtask.completed}
                onChange={() => handleCheckbox(subtask)}
              />
              <svg
                className="
                absolute 
                w-4 h-4 mt-1
                hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <label
                htmlFor={subtask.subtask_id}
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
          Update Task
        </button>
      </form>
    </section>
  )
}
