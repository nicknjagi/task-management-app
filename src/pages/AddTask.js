import React from 'react'
import AddTaskForm from '../components/AddTaskForm'
import { NavLink } from 'react-router-dom'

export default function AddTask() {
  return (
    <section className="flex flex-col justify-center w-full text-white py-2 mt-6 mb-8 ">
      <NavLink to="/" className='pl-6'>
        Back
      </NavLink>
      <AddTaskForm />
    </section>
  )
}
