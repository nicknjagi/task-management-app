import React, { useContext} from 'react'
import TaskColumn from './TaskColumn'
import Loader from './Loader'
import { BoardsContext } from '../layouts/Layout'

export default function Tasks() {
  const { tasks, isLoading } = useContext(BoardsContext)
  const status = ["todo","doing","done"]
  
  if (isLoading) return <Loader />
  
  return (
    <main className='tasks-container'>
      {status.map((el,index )=> {
        const newArr = tasks.filter(task => task.status === el)
        return <TaskColumn key={index} taskArr={newArr} title={el}/>
      })}
    </main>
  )
}
