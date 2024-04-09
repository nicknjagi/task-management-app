import React from 'react'
import AddTaskForm from '../components/AddTaskForm'
import BackButton from '../components/BackButton'

export default function AddTask() {
  return (
    <section className="section">
      <BackButton />
      <AddTaskForm />
    </section>
  )
}
