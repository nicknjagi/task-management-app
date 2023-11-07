import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Layout() {
  return (
    <div className='container'>
      <Sidebar />
      <div className='w-full  border-l border-slate-500'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
