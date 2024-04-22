import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from '../../assets/icon-cross.svg'
import { createTask } from "../../features/task/taskSlice";

export default function AddTaskForm() {
    const {columns} = useSelector(state => state.column)
    const {isLoading} = useSelector(state => state.task)
    const [task, setTask] = useState({
      title: "",
      userId:1,
      description: "",
      columnId:'',
      subtasks: [],
    });
    const [subtask, setSubtask] = useState("");
    const [subTwo, setSubTwo] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [titleIsEmpty, setTitleIsEmpty] = useState(false)
    const [statusIsEmpty, setStatusIsEmpty] = useState(false)
    const subtaskRef = useRef(null)
    const dispatch = useDispatch()

    function handleChange(e){
      setTask({...task, [e.target.name]: e.target.value})
    }

    function addSubtask(subtask){
        if (task.subtasks.length === 0){
            if (subtask.trim() === '' && subTwo.trim() === ''){
                setIsEmpty(true)
                return
            }
            if (subtask.trim() !== '' && subTwo.trim() !== ''){
                setIsEmpty(false)
                setTask({...task,subtasks: [...task.subtasks, {description:subTwo.trim()}, {description:subtask.trim()}]})
                setSubtask('')
                setSubTwo('')
                subtaskRef.current.value = ''
                return
            }
            else if(subTwo.trim() === ''){
                setIsEmpty(false)
                setTask({...task,subtasks:[...task.subtasks, {description:subtask.trim()}]})
                setSubtask('')
                subtaskRef.current.value = ''
                return
            }
            else {
                setIsEmpty(false)
                setTask({...task, subtasks:[...task.subtasks, {description:subTwo.trim()}]})
                setSubTwo('')
                subtaskRef.current.value = ''
                return
            }
        }
        else if(task.subtasks.length > 0 && subtask.trim() !== ''){
            setTask({...task,subtasks:[...task.subtasks, {description:subtask.trim()}]})
            setSubtask('')
            setIsEmpty(false)
            subtaskRef.current.value = ''
            return
        } 
        else {
            setIsEmpty(true)
        }
    }

    function removeSubtask(description){
        setTask({...task, subtasks: task.subtasks.filter(subtask => subtask.description !== description)})
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if(task.title.trim() === ''){
            setTitleIsEmpty(true)
            return
        }
        if(task.columnId.trim() === ''){
            setStatusIsEmpty(true)
            return
        }
          
        dispatch(createTask(task))
        setIsEmpty(false)
        setStatusIsEmpty(false)
        setTitleIsEmpty(false)
        setTask({
          title: "",
          userId:1,
          description: "",
          columnId:'',
          subtasks: [],
        })
        document.getElementById('add-task').close()
      }

  return (
    <form onSubmit={handleSubmit} className="form ">
      <h2>Add new task</h2>
      <div className="flex flex-col gap-6">
        <div className="form-row">
          <label className="text-mid-grey dark:text-white" htmlFor="title">Title</label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              style={titleIsEmpty ? {borderColor: 'rgb(234 85 85)'} : {}}
              className="input"
              placeholder="e.g. Take coffee break"
              value={task.title}
              onChange={handleChange}
            />
            {titleIsEmpty && <span className='text-sm text-red absolute right-6 top-1/2 -translate-y-1/2'>Can't be empty</span>}
          </div>
        </div>
        <div className="form-row">
          <label className="text-mid-grey dark:text-white" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="input py-2"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={handleChange}
            value={task.description}
          ></textarea>
        </div>

        <div className="form-row">
          <h3 className="text-mid-grey dark:text-white">Subtasks</h3>
          {task.subtasks.length > 0 &&
            task.subtasks.map((subtask, index) => {
              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="board-col">{subtask.description}</span>
                  <button
                    onClick={(e) => removeSubtask(subtask.description)}
                    type="button"
                    aria-label="remove subtask"
                  >
                    <img className="w-4 h-4" src={crossIcon} alt="" />
                  </button>
                </div>
              );
            })}

          {task.subtasks.length === 0 && (
            <div className="flex gap-4 relative">
              <input
                className="input w-full "
                type="text"
                name="subTwo"
                style={isEmpty ? { borderColor: "rgb(234 85 85)" } : {}}
                placeholder="e.g. Make coffee"
                onChange={(e) => setSubTwo(e.currentTarget.value)}
              />
              {isEmpty && (
                <span className="text-sm text-red absolute right-12 top-1/2 -translate-y-1/2">
                  Can't be empty
                </span>
              )}
              <button type="button" aria-label="remove subtask">
                <img className="w-4 h-4" src={crossIcon} alt="" />
              </button>
            </div>
          )}

          <div className="flex gap-4 relative">
            <input
              ref={subtaskRef}
              id={isEmpty && task.subtasks.length > 0 ? "input-err" : ""}
              style={(isEmpty && task.subtasks.length > 0) ? { borderColor: "rgb(234 85 85)" } : {}}
              className="input w-full "
              type="text"
              name="subtask"
              placeholder="e.g. Drink coffee & smile"
              onChange={(e) => setSubtask(e.currentTarget.value)}
            />
            {(isEmpty && task.subtasks.length > 0) && (
              <span className="text-sm text-red absolute right-12 top-1/2 -translate-y-1/2">
                Can't be empty
              </span>
            )}
            <button
              onClick={(e) => removeSubtask(subtask.description)}
              type="button"
              aria-label="remove column"
            >
              <img className="w-4 h-4" src={crossIcon} alt="" />
            </button>
          </div>

          <button
            onClick={() => addSubtask(subtask)}
            type="button"
            className="btn-light"
          >
           + add new subtask
          </button>
        </div>

        <div className="form-row">
          <label htmlFor="status" className="flex items-center justify-between">
            <span>Status</span>
            {statusIsEmpty && <span className="text-red text-sm font-normal">Choose a value</span>}
          </label>
          <select
            name="columnId"
            id="status"
            className="select select-bordered bg-white dark:text-white dark:bg-dark-grey focus:border-main-purple focus:outline-none w-full"
            onChange={handleChange}
            defaultValue={''}
          >
            <option value='' disabled>Choose</option>
          {columns?.map(column => {
            return <option key={column.id} value={column.id}>{column.name}</option>
          })}
          </select>
        </div>
        <button
          className="btn-purple"
        >
          {isLoading ? 'Creating Task...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
