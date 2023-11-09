import React, { useContext, useEffect, useState} from 'react'
import TaskColumn from './TaskColumn'
import { BoardsContext } from '../layouts/Layout'

export default function Tasks() {
  const status = ["todo","doing","done"]
  const [tasks, setTasks] = useState([])
  const {currentBoard} = useContext(BoardsContext)

  useEffect(()=> {
    fetch('https://task-management-app-ibvr.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.filter((task) => task.board_id === currentBoard.id))
      })
  }, [currentBoard])
  
  return (
    <main className='tasks-container'>
      {status.map((el,index )=> {
        const newArr = tasks.filter(task => task.status === el)
        return <TaskColumn key={index} taskArr={newArr} title={el}/>
      })}
    </main>
  )
}
