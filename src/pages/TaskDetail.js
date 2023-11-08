import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TaskDetail() {
  return (
    <section className="flex flex-col justify-center p-4 mx-2 mt-6 rounded-lg text-white w-full ">
      <NavLink to="/">Back</NavLink>
      <div className="p-6 mt-6 mx-auto bg-[#2C2C38] rounded-lg text-white w-full max-w-[600px]">
        <h2 className="text-lg mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Necessitatibus, quia!
        </h2>
        <p className="text-neutral-400 mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          architecto maxime accusantium. Dolorem laudantium quidem animi nostrum
          dolorum sunt repellendus nobis doloremque aliquid, esse hic. Fugiat
          molestias doloribus rerum nostrum?
        </p>
        <h3>Subtasks(2 of 3)</h3>
        <div className="subtasks my-4">
          <label htmlFor=""></label>
        </div>
        <div className='form-row'>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </section>
  )
}
