import React from 'react'
import Task from './Task'

export default function TaskColumn({title, taskArr}) {
  return (
    <section className="min-w-[240px] max-w-[240px]">
      <h4 className="mb-6 uppercase tracking-widest text-sm">
        {title} ({taskArr.length})
      </h4>
      <div className="flex flex-col gap-4">
        {taskArr.map((task) => {
          const doneSubtasks = task.subtasks.filter(
            (el) => el.completed === true
          ).length
          return <Task key={task.id} task={task} doneSubtasks={doneSubtasks} />
        })}
      </div>
    </section>
  )
}
