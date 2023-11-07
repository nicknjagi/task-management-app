import React from 'react'

export default function AddTaskForm() {
  return (
    <form className="add-task-form">
      <h2>Add New Task</h2>
      <div className="flex flex-col gap-6">
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="e.g. Take coffee break" />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="e.g. It's always good to take a break."></textarea>
        </div>
        <div className="form-row ">
          <h3>Subtasks</h3>
          <input type="text" id="subtask" placeholder="e.g. Make coffee" />
          <button className="subtask-btn bg-white text-btn-purple">+ Add New Subtask</button>
        </div>
        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="create-task-btn bg-btn-purple " value="Submit">
          Create Task
        </button>
      </div>
    </form>
  )
}
