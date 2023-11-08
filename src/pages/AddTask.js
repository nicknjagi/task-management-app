import React from 'react'
import AddTaskForm from '../components/AddTaskForm'
import { NavLink } from 'react-router-dom'

export default function AddTask() {
  return (
    <section className="flex flex-col justify-center w-full text-white p-4 mt-6 mx-2 ">
      <NavLink to="/" >
        Back
      </NavLink>
      <AddTaskForm />
    </section>
  )
}
