import EditBoardForm from "../forms/EditBoardForm"

const EditBoardModal = ({handleClick}) => {
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('edit-board').showModal()}className="text-mid-grey text-left transition px-2 py-2 w-full">Edit Board
        </button>
        <dialog id="edit-board" className="modal">
            <div className="modal-box">
                <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button onClick={handleClick} className="button button-circle button-ghost  text-xl absolute right-8 top-6">✕</button>
                </form>
                <EditBoardForm handleClick={handleClick}/>
            </div>
        </dialog>
    </div>
  )
}
export default EditBoardModal