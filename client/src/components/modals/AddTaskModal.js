import AddTaskForm from "../forms/AddTaskForm"

const AddTaskModal = () => {
    
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('add-task').showModal()}className='text-white bg-main-purple hover:bg-main-purple-hover px-4 pb-2 md:py-2 text-2xl font-bold md:text-base rounded-full '><span>+</span> <span className="hidden md:inline ml-2 text-sm">Add New Task</span></button>
        <dialog id="add-task" className="modal my-auto">
            <div className="modal-box">
                <AddTaskForm />
                <form method="dialog" className="md:hidden scale-125 absolute top-7 right-6">
                {/* if there is a button in form, it will close the modal */}
                <button>✕</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
            {/* if there is a button in form, it will close the modal */}
            <button>✕</button>
            </form>
        </dialog>
    </div>
  )
}
export default AddTaskModal