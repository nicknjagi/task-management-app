import React from 'react'
import TaskColumn from '../TaskColumn'
import Loader from '../Loader'
import { useSelector } from 'react-redux'
import './Tasks.css'

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
          <button onClick={()=>document.getElementById('edit-board').showModal()} className='btn-purple px-4'>+ Add New Column</button>
        </div>
      ) :
      <div className='rounded-lg bg-gradient-to-b from-[rgb(233,239,250)] to-[rgba(233,239,250,0.5)] dark:from-[rgba(43,44,55,1)]  dark:to-[rgba(43,44,55,0.5)] hover:bg-opacity-80 min-w-[280px] max-w-[280px] h-[90%] mt-[44px] transition flex items-center justify-center '>
        <button onClick={()=>document.getElementById('edit-board').showModal()} className='text-[#828C9E] hover:text-main-purple text-lg font-semibold transition'>+ New Column</button>
      </div>}
    </main>
  )
}
