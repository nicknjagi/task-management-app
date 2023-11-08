import React, { useContext} from 'react'
import TaskColumn from './TaskColumn'
import { BoardsContext } from '../layouts/Layout'

export default function Tasks() {
  const status = ["todo","doing","done"]
  const {currentBoard} = useContext(BoardsContext)

  return (
    <main className='tasks-container'>
      {currentBoard && status.map(el => {
        const newArr = currentBoard.board_tasks.filter(task => task.status === el)
        return <TaskColumn taskArr={newArr} title={el}/>
      })}
    </main>
  )
}
