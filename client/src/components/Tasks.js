import React from 'react'
import TaskColumn from './TaskColumn'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Tasks() {
  const {columns, isLoading} = useSelector(state => state.column)
  // const {currentBoard} = useSelector(state => state.board)

  if (isLoading) return <Loader />
  
  return (
    <main className='tasks-container'>
      {columns.map((column)=> {
        return <TaskColumn key={column.id} taskArr={column.tasks} title={column.name}/>
      })}
      <div className='rounded-lg bg-gradient-to-b from-[rgb(43,44,55)]  to-[rgba(43,44,55,0.5)] hover:bg-opacity-80 min-w-[280px] max-w-[280px] h-[90%] mt-[44px] transition flex items-center justify-center'>
        <Link to='/column/create' className='text-[#828C9E] text-lg font-semibold'>+ New Column</Link>
      </div>
    </main>
  )
}
