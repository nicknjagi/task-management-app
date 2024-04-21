import React from 'react'
import TaskColumn from './TaskColumn'
import Loader from './Loader'
import { useSelector } from 'react-redux'

export default function Tasks() {
  const {columns, isLoading} = useSelector(state => state.column)
  
  if (isLoading) return <Loader />
  
  return (
    <main className='tasks-container'>
      {columns?.map((column)=> {
        return <TaskColumn key={column.id} taskArr={column.tasks} title={column.name}/>
      })}
      {columns.length === 0 ? (
        <div className='w-full transition flex flex-col gap-8 items-center justify-center text-center'>
          <p className='text-mid-grey'>This board is empty. Create a new column to get started.</p>
          <button onClick={()=>document.getElementById('edit-board').showModal()} className='button px-3 bg-main-purple hover:bg-main-purple-hover transition text-white'>+ Add New Column</button>
        </div>
      ) :
      <div className='rounded-lg bg-gradient-to-t from-[rgba(43,44,55,0.5)]  to-[rgba(43,44,55,0.25)] hover:bg-opacity-80 min-w-[280px] max-w-[280px] h-[90%] mt-[44px] transition flex items-center justify-center'>
        <button onClick={()=>document.getElementById('edit-board').showModal()} className='dark:text-[#828C9E] dark:hover:text-main-purple text-lg font-semibold transition'>+ New Column</button>
      </div>}
    </main>
  )
}
