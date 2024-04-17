import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import elipsis from '../assets/images/ellipsis-vertical.svg'
import dropdown from '../assets/images/chevron-back-outline.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard, deleteBoard } from '../features/board/boardSlice'
import Swal from 'sweetalert2'

export default function Navbar() {
  const {currentBoard, boards } = useSelector(state => state.board)
  // const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#645FC6",
      cancelButtonColor: "rgb(248 113 113)",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBoard(currentBoard?.id))
      } 
    });
  }

  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 w-full p-6 md:pl-10 flex items-center justify-between text-white ">
      <div>
        <h2 className="hidden md:inline-block">
          {location.pathname === '/board/create'
            ? 'Create Board'
            : currentBoard?.boardName}
        </h2>
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-transparent">
            <span className='text-white '>{currentBoard?.boardName}</span> 
            <img className='inline w-4 -rotate-90' src={dropdown} alt="" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {boards?.map((board) => {
              return (
                <li
                  key={board.id}
                  className={board === currentBoard ? 'bg-[#645FC6] dd-link' : 'dd-link'}
                  onClick={()=> {dispatch(setCurrentBoard(board))}}
                >
                  {board.boardName}
                </li>
              )
            })}
            <li>
            <NavLink to="/board/create" className="px-6 mt-3 text-[#645FC6]">
          + Create New Board
        </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative flex gap-4 justify-end items-center">
        <NavLink
          to="/task/add"
          className="md:px-3 md:py-2 bg-[rgb(100,95,198)] hover:bg-violet-800 rounded-3xl transition">
          <span title="Add a task" className="p-4 md:p-0">
            {' '}
            +{' '}
          </span>{' '}
          <span className="hidden md:inline">Add New Task</span>
        </NavLink>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-transparent border-transparent ">
          <img className='w-6' src={elipsis} alt="delete icon" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 flex flex-col gap-2">
            <li>
              <Link to={`/board/update/${currentBoard?.id}`}>Update board</Link>
            </li>
            <li className='bg-red-400 rounded-btn' >
              <button onClick={handleDelete}>Delete board</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
