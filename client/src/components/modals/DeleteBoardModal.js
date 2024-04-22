import { useDispatch, useSelector } from "react-redux"
import { deleteBoard } from "../../features/board/boardSlice"

const DeleteBoardModal = ({handleClick}) => {
  const {currentBoard} = useSelector(state => state.board)
  const dispatch = useDispatch()

  function handleDelete(){
    dispatch(deleteBoard(currentBoard.id))
    document.getElementById('delete-board').close()
    handleClick()
  }

  return (
    <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('delete-board').showModal()}className='hover:bg-transparent text-left text-red hover:text-red-hover px-2 py-2 w-full '>Delete board</button>
        <dialog id="delete-board" className="modal hover:bg-transparent">
        <div className="modal-box">
            <div className="p-6 bg-white dark:bg-dark-grey">
              <h3 className="font-bold text-lg text-red">Delete this board?</h3>
              <p className="my-6 text-sm text-mid-grey ">Are you sure you want to delete the ‘{currentBoard?.boardName}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
              <div className="grid grid-cols-2 gap-4 ">
                <button onClick={handleDelete} className="delete-btn">Delete</button>
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={handleClick} className="cancel-btn">Cancel</button>
                </form>
              </div>
            </div>
        </div>
        </dialog>
    </div>
  )
}
export default DeleteBoardModal