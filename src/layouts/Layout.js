import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { createContext } from 'react'

export const BoardsContext = createContext()

export default function Layout() {
  const [boards, setBoards] = useState('')
  const [currentBoard, setCurrentBoard] = useState('')
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://task-management-app-ibvr.onrender.com/boards')
      .then((res) => res.json())
      .then((data) => {
        setBoards(data)
        setCurrentBoard(data[0])
      })
    }, [])

  useEffect(() => {
    setIsLoading(true)
    fetch('https://task-management-app-ibvr.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.filter((task) => task.board_id === currentBoard.id))
        setIsLoading(false)
      })
  }, [currentBoard])

  return (
    <BoardsContext.Provider
      value={{
        boards,
        currentBoard,
        setCurrentBoard,
        setBoards,
        tasks,
        setTasks,
        isLoading
      }}>
      <div className="container">
        <Sidebar />
        <div className="grid grid-rows-[100px_1fr] oveflow-x-auto w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </BoardsContext.Provider>
  )
}
