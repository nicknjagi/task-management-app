import React, {useState } from 'react'
import { NavLink } from 'react-router-dom'
import eye from '../assets/images/eye.svg'
import eyeOff from '../assets/images/eye-off.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard } from '../features/board/boardSlice'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const {boards, isLoading, currentBoard} = useSelector(state => state.board)
  const dispatch = useDispatch()

  function handleClick(){
    setIsOpen(!isOpen)
  }
  if(isLoading){
    return <h1>Loading...</h1>
  }
  
  return (
    <aside className={isOpen ? 'sidebar open' : 'sidebar'}>
      <div className="relative h-full flex flex-col ">
        <h1 className="px-6 mb-6 text-2xl text-white font-medium">Kanban</h1>
        <h3 className="px-6 mb-3 text-neutral-400 text-sm tracking-widest">
          ALL BOARDS ({boards.boards.length})
        </h3>
        <ul className="text-neutral-400">
          {boards.boards.map((board) => {
              return (
                <li
                  key={board.id}
                  onClick={() => dispatch(setCurrentBoard(board))}
                  className={board === currentBoard ? 'active' : ''}
                >
                  <NavLink to="/">{board.boardName}</NavLink>
                </li>
              )
            })}
        </ul>
        <NavLink to="/board/create" className="px-6 mt-3 text-[#645FC6]">
          + Create New Board
        </NavLink>
        <button onClick={handleClick}>
          {isOpen ? (
            <div className="flex items-center gap-1">
              <img src={eyeOff} alt="" className="w-4 inline" />
              <span>Hide sidebar</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <img src={eye} alt="" className="w-4 inline" />
              <span>View sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
