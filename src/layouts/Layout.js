import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { createContext } from 'react'

export const BoardsContext = createContext()

export default function Layout() {
  const [data, setData] = useState()
  // const [isLoading, setIsLoading] = useState(true)
  const [currentBoard, setCurrentBoard] = useState('')

  useEffect(() => {
    // setIsLoading(true)
    fetch('https://task-management-app-ibvr.onrender.com/boards')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setCurrentBoard(data[0])
      })
    }, [])

  return (
    <BoardsContext.Provider
      value={{ data, currentBoard, setCurrentBoard }}>
      <div className="container">
        <Sidebar />
        <div className="grid grid-rows-[100px_1fr] w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </BoardsContext.Provider>
  )
}
