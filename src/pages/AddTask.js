import React from 'react'
import AddTaskForm from '../components/AddTaskForm'
import { NavLink } from 'react-router-dom'

export default function AddTask() {
  return (
    <section className="section">
      <NavLink to="/" className="pl-6 md:pl-10">
        Back
      </NavLink>
      <AddTaskForm />
    </section>
  )
}
