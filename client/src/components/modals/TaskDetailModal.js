import { useDispatch} from "react-redux";
import TaskDetail from "../TaskDetail";
import { setCurrentTask } from "../../features/task/taskSlice";
import { useState } from "react";

const TaskDetailModal = ({task }) => {
  const dispatch = useDispatch()
  const [doneSubtasks, setDoneSubtasks] = useState(task.subtasks.filter(
    (el) => el.completed === true
  ).length)

  const handleClick = (task) => {
    dispatch(setCurrentTask(task))
    document.getElementById(`task-${task.id}`).showModal()
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div
        role="button"
        className="task"
        onClick={() => handleClick(task)}
      >
        <h3 className="text-black dark:text-white capitalize font-bold mb-2">{task.title}</h3>
        <p className="text-sm font-bold text-mid-grey">{doneSubtasks} of {task.subtasks.length} subtasks</p>
      </div>
      <dialog id={`task-${task.id}`} className="modal ">
        <div className="modal-box">
          <TaskDetail task={task} doneSubtasks={doneSubtasks} setDoneSubtasks={setDoneSubtasks}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
export default TaskDetailModal;
