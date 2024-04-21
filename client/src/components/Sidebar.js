import React, {useState } from 'react'
import { NavLink } from 'react-router-dom'
import eye from '../assets/images/eye.svg'
import logo from '../assets/logo-light.svg'
import boardIcon from '../assets/icon-board.svg'
import eyeOff from '../assets/images/eye-off.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard } from '../features/board/boardSlice'
import CreateBoardModal from './modals/CreateBoardModal'

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
        <div className='ml-8 mb-14'>
          <img src={logo} alt="" />
        </div>
        <h3 className="px-8 mb-3 dark:text-mid-grey text-sm tracking-widest">
          ALL BOARDS ({boards.length})
        </h3>
        <ul className="dark:text-mid-grey">
          {boards.map((board) => {
              return (
                <li
                  key={board?.id}
                  onClick={() => dispatch(setCurrentBoard(board))}
                  className={board === currentBoard ? 'active' : ''}
                >
                  <NavLink to="/" >
                  <div className="flex items-center gap-4">
                    <img src={boardIcon}  className='inline-block' alt="" />
                    <span>{board?.boardName}</span>
                  </div>
                  </NavLink>
                </li>
              )
            })}
        </ul>
        <CreateBoardModal />
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
