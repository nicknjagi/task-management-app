import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {Toaster} from 'react-hot-toast'
import ProjectInfoModal from "../components/modals/ProjectInfoModal"

export default function Layout() {
  return (
      <div className="container">
        <Toaster />
        <Sidebar />
        <div className="flex flex-col overflow-x-auto w-full ">
          <Navbar />
          <Outlet />
          <ProjectInfoModal />
        </div>
      </div>
  )
}
