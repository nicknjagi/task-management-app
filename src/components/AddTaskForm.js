import React, { useContext, useState } from 'react'
import { BoardsContext } from '../layouts/Layout'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function AddTaskForm() {
  const [subtasks, setSubtasks] = useState([])
  const [subtask, setSubtask] = useState('')
  const { currentBoard } = useContext(BoardsContext)
  const [task, setTask] = useState({
    title: '',
    board_id:currentBoard.id,
    description: '',
    status: 'todo',
    subtasks: [],
  })

  const navigate = useNavigate()
  const MySwal = withReactContent(Swal) 

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.values(task).includes('')){
      Swal.fire({
        text: 'Please fill all fields',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
      return
    }

    fetch(`https://task-management-app-ibvr.onrender.com/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, subtasks }),
    }).then((res) => {
      MySwal.fire({
        text: 'Task has been updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(res => {
        navigate('/')
      })
    })
    setTask({
      title: '',
      board_id: currentBoard.id,
      description: '',
      status: 'todo',
      subtasks: [],
    })
    setSubtask([])
  }

  function handleSubtask(e) {
    setSubtask(e.target.value)
  }

  function handleNewSubtask() {
    if (subtask === '') return
    const subTaskObj = {
      subtask_id: new Date().getMilliseconds(),
      subtask: subtask,
      completed: false,
    }
    setSubtasks([...subtasks, subTaskObj])
    setTask({ ...task, subtasks: [...subtasks, subTaskObj] })
    setSubtask('')
  }

  function removeSubtask(id){
    const newArr = subtasks.filter((el) => el.subtask_id !== id)
    setSubtasks(newArr)
  }

  return (
    <form className="add-task-form max-w-[600px]">
      <h2>Add new task</h2>
      <div className="flex flex-col gap-6">
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Take coffee break"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="e.g. It's always good to take a break."
            onChange={handleChange}
            value={task.description}></textarea>
        </div>
        <div className="form-row ">
          <h3>Subtasks</h3>
          {subtasks.length > 0 &&
            subtasks.map((el) => {
              return (
                <div key={el.subtask_id} className="flex gap-4">
                  <p className="w-full p-2 border border-neutral-600 bg-inherit rounded">
                    {el.subtask}
                  </p>
                  <button
                    onClick={() => removeSubtask(el.subtask_id)}
                    type="button"
                    className="scale-150">
                    &times;
                  </button>
                </div>
              )
            })}
          <input
            type="text"
            id="subtask"
            placeholder="e.g. Make coffee"
            onChange={handleSubtask}
            value={subtask}
          />
          <button
            type="button"
            onClick={handleNewSubtask}
            className="subtask-btn bg-white hover:bg-slate-200 text-btn-purple transition">
            + Add New Subtask
          </button>
        </div>
        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={task.status}
            onChange={handleChange}>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="create-task-btn bg-btn-purple hover:bg-violet-800 transition"
          onClick={handleSubmit}>
          Create Task
        </button>
      </div>
    </form>
  )
}
