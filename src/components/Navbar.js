import React, { useContext, useState} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BoardsContext } from '../layouts/Layout'
import elipsis from '../assets/images/ellipsis-vertical.svg'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Navbar() {
  const [showDelete, setShowDelete] = useState(false)
  const { boards,setBoards, currentBoard, setCurrentBoard} = useContext(BoardsContext)
  const navigate = useNavigate()
  const location = useLocation()

  const MySwal = withReactContent(Swal) 

  function handleChange(e){
    if (e.target.value === 'create'){
      navigate('/create')
      return
    }
    const curr = boards.filter(board => board.board_name === e.target.value)[0]
    setCurrentBoard(curr)
    navigate('/')
  }

  function handleClick() {
    setShowDelete(!showDelete)
  }

  function deleteBoard(id){
    MySwal.fire({
      title: 'Do you want to delete the board?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://task-management-app-ibvr.onrender.com/tasks/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(() => {
          Swal.fire('Board has been deleted!', '', 'success')
          const newBoards = boards.filter((board) => board.id !== id)
          setBoards(newBoards)
          setCurrentBoard(newBoards[0])
          setShowDelete(false)
          })
        }
        else if(result.isDismissed){
          setShowDelete(false)
        }
    })
  }

  return (
    <header className="bg-[#2C2C38] border-b border-slate-500 w-full p-6 md:pl-10 flex items-center justify-between text-white">
      <div>
        <h2 className="hidden md:inline-block">
          {location.pathname === '/create'
            ? 'Create Board'
            : currentBoard.board_name}
        </h2>
        <select
          name="board"
          id="board"
          className="border-0 md:hidden"
          value={
            location.pathname === '/create'
              ? 'Create Board'
              : currentBoard.board_name
          }
          onChange={handleChange}>
          {boards &&
            boards.map((board) => {
              return (
                <option
                  key={board.id}
                  className={board === currentBoard ? 'bg-[#645FC6]' : ''}
                  value={board.board_name}>
                  {board.board_name}
                </option>
              )
            })}
          <option value="create">+ Create New Board</option>
        </select>
      </div>
      <div className="relative flex gap-4 justify-between items-center">
        <NavLink
          to="/add"
          className="md:px-3 md:py-2 bg-[#645FC6] hover:bg-violet-800 rounded-3xl transition">
          <span title="Add a task" className="p-4 md:p-0">
            {' '}
            +{' '}
          </span>{' '}
          <span className="hidden md:inline">Add New Task</span>
        </NavLink>
        <button
          type="button"
          className="w-6"
          aria-label="options"
          onClick={handleClick}>
          <img src={elipsis} alt="delete icon" />
        </button>
        {showDelete && (
          <button
            type="button"
            className="absolute right-3 -bottom-10 w-32 py-1 px-2 bg-red-500 hover:bg-red-600 rounded-md"
            onClick={() => deleteBoard(currentBoard.id)}>
            Delete board
          </button>
        )}
      </div>
    </header>
  )
}
