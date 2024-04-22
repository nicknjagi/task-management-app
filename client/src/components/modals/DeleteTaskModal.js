import { useDispatch, useSelector } from "react-redux"
import { deleteTask } from "../../features/task/taskSlice"

const DeleteTaskModal = ({setShowOptions}) => {
  const {currentTask} = useSelector(state => state.task)
  const dispatch = useDispatch()

  function handleDelete(){
    dispatch(deleteTask(currentTask.id))
    document.getElementById('delete-task').close()
    // handleClick()
  }

  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className='hover:bg-transparent text-left text-red hover:text-red-hover px-2 py-2 w-full ' onClick={()=>document.getElementById('delete-task').showModal()}>Delete Task</button>
        <dialog id="delete-task" className="modal">
          <div className="modal-box ">
          <div className="p-6 bg-white dark:bg-dark-grey">
              <h3 className="font-bold text-lg text-red">Delete this task?</h3>
              <p className="my-6 text-sm text-mid-grey ">Are you sure you want to delete the ‘{currentTask?.title}’ task and its subtasks? This action cannot be reversed.</p>
              <div className="grid grid-cols-2 gap-4 ">
                <button onClick={handleDelete} className="delete-btn">Delete</button>
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={()=>setShowOptions(false)} className="cancel-btn">Cancel</button>
                </form>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  )
}
export default DeleteTaskModal