import elipsis from '../../assets/images/ellipsis-vertical.svg'
import dropdown from '../../assets/images/chevron-back-outline.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBoard } from '../../features/board/boardSlice'
import CreateBoardModal from '../modals/CreateBoardModal'
import EditBoardModal from '../modals/EditBoardModal'
import DeleteBoardModal from '../modals/DeleteBoardModal'
import boardIcon from '../../assets/icon-board.svg'
import logo from '../../assets/logo-mobile.svg'
import AddTaskModal from '../modals/AddTaskModal'
import ThemeToggle from '../ThemeToggle'
import './Navbar.css'

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
          <div className="modal-box bg-white dark:bg-dark-grey transition">
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
                      <img src={boardIcon}  className='inline-block' alt="" />
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
