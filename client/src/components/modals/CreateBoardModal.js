import boardIcon from '../../assets/icon-board.svg'
import CreateBoardForm from '../forms/CreateBoardForm'

const CreateBoardModal = () => {


  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('my_modal_4').showModal()}className="px-6 md:px-8 md:mt-3 dark:text-main-purple transition">
            <div className="flex items-center gap-2 md:gap-4">
                <img src={boardIcon}  className='inline-block' alt="" />
                <span>+ Create New Board</span>
            </div>
        </button>
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box ">
                <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button className="button button-circle button-ghost absolute text-xl right-8 top-6">✕</button>
                </form>
                <CreateBoardForm />
            </div>
        </dialog>
    </div>
  )
}
export default CreateBoardModal