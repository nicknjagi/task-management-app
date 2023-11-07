import React from 'react'
import Task from './Task'

export default function TaskColumn() {
  return (
    <section>
      <h4 className='mb-6'>TODO (4)</h4>
      <div className='flex flex-col gap-4'>
        <Task />
        <Task />
      </div>
    </section>
  )
}
