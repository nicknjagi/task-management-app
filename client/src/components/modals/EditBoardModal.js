import EditBoardForm from "../forms/EditBoardForm"

const EditBoardModal = ({handleClick}) => {
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('edit-board').showModal()}className="text-mid-grey text-left transition px-2 py-2 w-full">Edit Board
        </button>
        <dialog id="edit-board" className="modal">
            <div className="modal-box">
                <EditBoardForm handleClick={handleClick}/>
            </div>
            <form method="dialog" className="modal-backdrop" >
            {/* if there is a button in form, it will close the modal */}
            <button>✕</button>
            </form>
        </dialog>
    </div>
  )
}
export default EditBoardModal