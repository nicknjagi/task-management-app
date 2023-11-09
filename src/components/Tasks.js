import React, { useContext, useEffect, useState} from 'react'
import TaskColumn from './TaskColumn'
import Loader from './Loader'
import { BoardsContext } from '../layouts/Layout'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {currentBoard} = useContext(BoardsContext)
  const status = ["todo","doing","done"]

  useEffect(()=> {
    setIsLoading(true)
    fetch('https://task-management-app-ibvr.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.filter((task) => task.board_id === currentBoard.id))
        setIsLoading(false)
      })
  }, [currentBoard])
  
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
