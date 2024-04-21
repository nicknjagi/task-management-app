import AddTaskForm from "../forms/AddTaskForm"

const AddTaskModal = () => {
    
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('add-task').showModal()}className='text-white bg-main-purple px-4 pb-2 md:py-2 text-2xl font-bold md:text-base rounded-full '><span>+</span> <span className="hidden md:inline ml-2 text-sm">Add New Task</span></button>
        <dialog id="add-task" className="modal">
            <div className="modal-box">
                <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button className="button button-circle button-ghost absolute text-xl right-8 top-6">✕</button>
                </form>
                <AddTaskForm />
            </div>
        </dialog>
    </div>
  )
}
export default AddTaskModal