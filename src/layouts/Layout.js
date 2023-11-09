import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { createContext } from 'react'

export const BoardsContext = createContext()

export default function Layout() {
  const [boards, setBoards] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentBoard, setCurrentBoard] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetch('https://task-management-app-ibvr.onrender.com/boards')
      .then((res) => res.json())
      .then((data) => {
        setBoards(data)
        setCurrentBoard(data[0])
        setIsLoading(false)
      })
    }, [])

  return (
    <BoardsContext.Provider
      value={{ boards, currentBoard, setCurrentBoard }}>
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
