import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Layout() {
  const [boards, setBoards] = useState('')
  const [currentBoard, setCurrentBoard] = useState('')
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  return (
      <div className="container">
        <Sidebar />
        <div className="grid grid-rows-[100px_1fr] oveflow-x-auto w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
  )
}
