import React from 'react'
import TaskDetailModal from './modals/TaskDetailModal'

export default function TaskColumn({title, taskArr}) {
  return (
    <section className="min-w-[280px] max-w-[280px] ">
      <h4 className="mb-6 uppercase tracking-widest text-sm font-bold text-mid-grey">
        {title} ({taskArr.length})
      </h4>
      <div className="flex flex-col gap-4">
        {taskArr.map((task) => {
          return <TaskDetailModal onClick={() => document.getElementById('task-detail').showModal()} key={task.id} task={task}  />
        })}
      </div>
    </section>
  )
}
