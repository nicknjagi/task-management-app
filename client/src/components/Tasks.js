import React from 'react'
import TaskColumn from './TaskColumn'
import Loader from './Loader'
import { useSelector } from 'react-redux'

export default function Tasks() {
  const {currentBoard, isLoading} = useSelector(state => state.board)
  const status = ["todo","doing","done"]
  
  if (isLoading) return <Loader />
  
  return (
    <main className='tasks-container'>
      {currentBoard.columns.map((column)=> {
        return <TaskColumn key={column.id} taskArr={column.tasks} title={column.name}/>
      })}
    </main>
  )
}
