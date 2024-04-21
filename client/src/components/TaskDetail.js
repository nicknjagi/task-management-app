import { useState } from "react";
import Loader from "../components/Loader";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useDispatch, useSelector } from "react-redux";
import EditTaskModal from "./modals/EditTaskModal";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import { updateSubtask } from "../features/subtask/subtaskSlice";

export default function TaskDetail({ task, doneSubtasks, setDoneSubtasks }) {
  const { columns } = useSelector((state) => state.column);
  const { isUpdating } = useSelector((state) => state.subtask);
  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(task);
  const [showOptions, setShowOptions] = useState(false);

  const { title, description, subtasks } = task;
  
  function handleCheckbox(el) {
    const { id, completed } = el;
    const subtaskArr = [
      ...currentTask.subtasks.filter((subtask) => subtask.id !== el.id),
    ];
    const newSubtasks = [
      ...subtaskArr,
      { ...el, completed: !el.completed },
    ].sort((a, b) => {
      return a.id - b.id;
    });
    if (completed) {
      dispatch(updateSubtask({ id, completed: false }));
    } else {
      dispatch(updateSubtask({ id, completed: true }));
    }
    document.getElementById(`task-${el.taskId}`).showModal()
    setCurrentTask({ ...currentTask, subtasks: newSubtasks });
    setDoneSubtasks(newSubtasks.filter(
      (el) => el.completed === true
    ).length)
    return;
  }

  function handleStatusChange(e) {
    // console.log(e.currentTarget.value);
    // console.log(currentTask);
    // setCurrentTask({ ...currentTask, status: e.target.value });
  }

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  // function hideOptions() {
  //   if (showOptions) {
  //     // setShowOptions(false)
  //   }
  // }

  return (
    <section className={`form ${isUpdating ? 'cursor-wait': ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold !mb-0">{title}</h2>

        <div className="dropdown dropdown-bottom dropdown-left relative">
          <div
            onClick={handleClick}
            tabIndex={0}
            role="button"
            className="p-3 pt-0 -mr-2  bg-transparent border-transparent rounded-full"
          >
            <img className="w-auto h-6" src={ellipsis} alt="icon" />
          </div>
          {showOptions && (
            <ul
              tabIndex={0}
              className={`absolute top-6 right-full z-[1] menu p-2 shadow rounded-box w-44 dark:bg-very-dark-grey `}
            >
              <li className="dd-btn">
                <EditTaskModal setShowOptions={setShowOptions} />
              </li>
              <li className="dd-btn">
                <DeleteTaskModal setShowOptions={setShowOptions} />
              </li>
            </ul>
          )}
        </div>
      </div>

      <p className="text-mid-grey text-sm mb-6">{description}</p>
      <h3 className="text-sm font-bold">
        Subtasks({doneSubtasks}) of{" "}
        ({subtasks.length})
      </h3>

      {currentTask?.subtasks.map((subtask) => {
        return (
          <div
            key={subtask.id}
            className="subtasks my-2 px-3 rounded-md flex items-center gap-4 bg-[#21212D]"
          >
            <input
              className="relative peer my-3"
              type="checkbox"
              name={subtask.subtask_id}
              id={subtask.id}
              checked={subtask.completed} // Set the checked attribute based on the completed property
              onChange={() => handleCheckbox(subtask)}
            />
            {subtask.completed && (
              <svg
                className="bg-main-purple
                absolute 
                w-[14px] h-4 block rounded-sm"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
            <label
              htmlFor={subtask.id}
              style={subtask.completed ? { color: "rgb(130 143 163)" } : {}}
              className={
                subtask.completed
                  ? "dark:text-mid-grey line-through w-full py-3 text-sm !font-normal	"
                  : "w-full py-3 text-sm !font-normal"
              }
            >
              {subtask.description}
            </label>
          </div>
        );
      })}

      <div className="form-row mt-6">
        <h3>Current Status</h3>
        <select
          name="columnId"
          className="select select-bordered dark:bg-dark-grey focus:border-main-purple focus:outline-none w-full"
          value={columns?.filter(column => column.id === currentTask.columnId)[0].id}
          onChange={handleStatusChange}
        >
          <option value="" disabled>
            Choose
          </option>
          {columns?.map((column) => {
            return (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
}
