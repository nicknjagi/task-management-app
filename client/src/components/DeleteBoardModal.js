import { useDispatch, useSelector } from "react-redux"
import { deleteBoard } from "../features/board/boardSlice"

const DeleteBoardModal = ({handleClick}) => {
  const {currentBoard} = useSelector(state => state.board)
  const dispatch = useDispatch()

  function handleDelete(){
    dispatch(deleteBoard(currentBoard.id))
    document.getElementById('my_modal_6').close()
    handleClick()
  }

  return (
    <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('my_modal_6').showModal()}className='hover:bg-transparent text-left text-red hover:text-red-hover px-2 py-2 w-full '>Delete board</button>
        <dialog id="my_modal_6" className="modal hover:bg-transparent">
        <div className="modal-box bg-white dark:bg-dark-grey p-8">
            <h3 className="font-bold text-lg text-red">Delete this board?</h3>
            <p className="py-4 text-mid-grey">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="grid grid-cols-2 gap-4 ">
              <button onClick={handleDelete} className="py-2 px-6 bg-red hover:bg-red-hover rounded-[20px] font-bold transition">Delete</button>
              <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleClick} className="w-full dark:bg-white py-2 dark:text-main-purple dark:hover:text-main-purple-hover rounded-[20px] font-bold transition">Cancel</button>
              </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}
export default DeleteBoardModal