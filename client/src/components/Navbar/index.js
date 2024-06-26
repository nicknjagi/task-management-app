import elipsis from '../../assets/images/ellipsis-vertical.svg'
import dropdown from '../../assets/images/chevron-back-outline.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard } from '../../features/board/boardSlice'
import CreateBoardModal from '../modals/CreateBoardModal'
import EditBoardModal from '../modals/EditBoardModal'
import DeleteBoardModal from '../modals/DeleteBoardModal'
import logo from '../../assets/logo-mobile.svg'
import AddTaskModal from '../modals/AddTaskModal'
import ThemeToggle from '../ThemeToggle'
import './Navbar.css'
import { getColumns } from '../../features/column/columnSlice'

export default function Navbar() {
  const {currentBoard, boards, isLoading } = useSelector(state => state.board)
  const dispatch = useDispatch()

  const handleClick = () => {
    const elem = document.activeElement;
    if(elem){
      elem?.blur();
    }
  };

  const changeBoard = (board) => {
    dispatch(setCurrentBoard(board))
    dispatch(getColumns(board.id))
    document.getElementById('drop-mobile').close()
  }

  return (
    <header>
      <div>
        <h1>{currentBoard?.boardName}</h1>

        {/* modal mobile */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div onClick={()=>document.getElementById('drop-mobile').showModal()} tabIndex={0} role="button" className="flex items-center button m-1 bg-transparent border-transparent md:hidden">
            <img className='inline w-5 mx-2' src={logo} alt="" />
            <h1 className='dark:text-white text-lg font-bold inline-block mr-2'>{currentBoard?.boardName}</h1> 
            <img className='inline w-4 -rotate-90' src={dropdown} alt="" />
          </div>
        <dialog id="drop-mobile" className="modal">
          <div className="modal-box bg-white dark:bg-dark-grey transition shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]">
            <ul className='py-6'>
              <li>
                <h3 className="hover:bg-transparent px-6 mb-4 dark:text-mid-grey text-sm font-bold tracking-widest">
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
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"/></svg>
                      <span>{board?.boardName}</span>
                    </div>
                  </li>
                )
              })}
              <li className='w-full mb-4 pr-6 transition'>
                <CreateBoardModal />
              </li>
              <li className='mx-4'>
                <ThemeToggle />
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
        {/* navbar dropdown */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="button bg-transparent border-transparent ">
            <img className='w-6' src={elipsis} alt="delete icon" />
          </div>
          <ul id='drop-menu' tabIndex={0} className={`dropdown-content z-[1] menu p-2 mt-5 shadow rounded-box w-52 flex flex-col gap-2 bg-white dark:bg-very-dark-grey`}>
            <li className='dd-btn'>
              <EditBoardModal handleClick={handleClick}/>
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
