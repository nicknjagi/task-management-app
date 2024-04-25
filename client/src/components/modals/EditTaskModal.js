import { useSelector } from "react-redux";
import EditTaskForm from "../forms/EditTaskForm"

const EditTaskModal = ({setShowOptions, id}) => {
  const {currentTask} = useSelector(state => state.task)
  function handleClick(){
    document.getElementById('edit-task').showModal()
    document.getElementById(`task-${currentTask.id}`).close()
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="text-mid-grey text-left transition px-2 py-2 w-full" onClick={handleClick}>Edit Task</button>
      <dialog id="edit-task" className="modal">
        <div className="modal-box">
          <EditTaskForm />
          <form method="dialog" className="md:hidden scale-125 absolute top-7 right-6">
                {/* if there is a button in form, it will close the modal */}
                <button>✕</button>
                </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={()=>setShowOptions(false)}>✕</button>
        </form>
      </dialog>
    </div>
  )
}
export default EditTaskModal