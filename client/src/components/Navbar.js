import React, { useState } from 'react'
import {  NavLink, useLocation, useNavigate } from 'react-router-dom'
import elipsis from '../assets/images/ellipsis-vertical.svg'
import dropdown from '../assets/images/chevron-back-outline.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard, deleteBoard } from '../features/board/boardSlice'
import CreateBoardModal from './CreateBoardModal'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import boardIcon from '../assets/icon-board.svg'
import logo from '../assets/logo-mobile.svg'
import AddTaskModal from './AddTaskModal'

export default function Navbar() {
  const {currentBoard, boards, isLoading } = useSelector(state => state.board)
  // const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleClick = () => {
    const elem = document.activeElement;
    if(elem){
      elem?.blur();
    }
  };

  const changeBoard = (board) => {
    dispatch(setCurrentBoard(board))
    document.getElementById('drop-mobile').close()
  }

  return (
    <header className="dark:bg-dark-grey border-b dark:border-mid-grey w-full py-6 md:p-6 md:pr-4 lg:pl-10 flex items-center justify-between text-white">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold hidden md:inline-block">
          {currentBoard?.boardName}
        </h1>

        {/* modal mobile */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div onClick={()=>document.getElementById('drop-mobile').showModal()} tabIndex={0} role="button" className="flex items-center button m-1 bg-transparent border-transparent md:hidden">
            <img className='inline w-5 mx-2' src={logo} alt="" />
            <h1 className='dark:text-white text-lg font-bold inline-block mr-2'>{currentBoard?.boardName}</h1> 
            <img className='inline w-4 -rotate-90' src={dropdown} alt="" />
          </div>
        <dialog id="drop-mobile" className="modal">
          <div className="modal-box ">
            <ul className='py-6'>
              <li>
                <h3 className="hover:bg-transparent px-6 mb-4 dark:text-mid-grey text-sm tracking-widest">
                  ALL BOARDS ({boards.length})
                </h3>
              </li>
              {!isLoading && boards?.map((board) => {
                return (
                  <li
                    key={board.id}
                    className={board === currentBoard ? 'bg-main-purple dd-link text-white ' : 'dd-link text-mid-grey'}
                    onClick={()=> changeBoard(board)}
                  >
                    <div className="flex items-center justify-start w-full gap-2 p-0">
                      <img src={boardIcon}  className='inline-block' alt="" />
                      <span>{board?.boardName}</span>
                    </div>
                  </li>
                )
              })}
              <li className='py-3'>
              <CreateBoardModal />
              </li>
            </ul>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div className="relative flex gap-4 justify-center items-center">
        <AddTaskModal />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="button bg-transparent border-transparent ">
            <img className='w-6' src={elipsis} alt="delete icon" />
          </div>
          <ul id='drop-menu' tabIndex={0} className={`dropdown-content z-[1] menu p-2 mt-5 shadow rounded-box w-52 flex flex-col gap-2 bg-very-dark-grey`}>
            <li className='dd-btn'>
              <UpdateBoardModal handleClick={handleClick}/>
            </li>
            <li className='dd-btn'>
              <DeleteBoardModal handleClick={handleClick}/>
            </li>
          </ul>
        </div>    
      </div>
    </header>
  )
}
