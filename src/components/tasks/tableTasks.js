import { useTask } from "../../context/taskContext";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
import TaskEditPopup from "./taskEditPopup";

export default function TableTasks() {
    const { tasks } = useTask();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTasks, setCurrentTasks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [openTaskEditPopup, setOpenTaskEditPopup] = useState(false);
    const [trHover, setTrHover] = useState({
        taskId: -1,
        hover: false
    });
    const [task, setTask] = useState(null);
    const tasksPerPage = 5;

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }).split('/').join('-');


        return formattedDate;
    }
    function getTimeFromDatetime(datetime) {
        // Create a new Date object from the datetime string
        const date = new Date(datetime);

        // Extract the hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format the hours and minutes to ensure they are always two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Combine hours and minutes with a colon
        const timeString = `${formattedHours}:${formattedMinutes}`;

        return timeString;
    }

    useEffect(() => {
        if (tasks) {
            // Calculate the indices for slicing the tasks array
            const indexOfLastTask = currentPage * tasksPerPage;
            const indexOfFirstTask = indexOfLastTask - tasksPerPage;
            const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
            setCurrentTasks(currentTasks)
            // Calculate total pages
            const totalPages = Math.ceil(tasks.length / tasksPerPage);
            setTotalPages(totalPages)
        }
        console.log(tasks, "table")
    }, [tasks, currentPage])

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTaskClick = (task) => {
        setTask(task)
        setOpenTaskEditPopup(true);
    }

    return (
        <>      {
            !openTaskEditPopup ?
                <div>
                    <div className="overflow-x-auto w-full table-container ">
                        <table className="bg-[#8758ff] w-full min-w-max min-h-max">
                            <thead>
                                <tr>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Title</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-pretty text-[#1A1A40] ">Details</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Priority</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Status</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.length ? currentTasks.map((task) => (
                                    <tr
                                        onMouseEnter={() => (setTrHover({
                                            taskId: task.taskId,
                                            hover: true
                                        }))}
                                        onMouseLeave={() => (setTrHover({
                                            taskId: -1,
                                            hover: false
                                        }))}

                                        className={`tr-hover border-solid z-10 cursor-pointer ${trHover.taskId === task.taskId ? "border-2 border-green-500" : ""}`} key={task.id} onClick={() => { handleTaskClick(task) }}>

                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] ${trHover.taskId === task.taskId ? "" : ""}`}
                                        >{task.title}</td>
                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] description-column ${trHover.taskId === task.taskId ? " " : ""}`}>{task.description}</td>
                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] ${trHover.taskId === task.taskId ? "" : ""}`}>{task.priorityLevel}</td>
                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-center ${trHover.taskId === task.taskId ? "" : ""}`}>
                                            {task.isDone ? (
                                                <DoneIcon className="text-green-600" />
                                            ) : (
                                                <CloseIcon className="text-red-600" />
                                            )}
                                        </td>
                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] ${trHover.taskId === task.taskId ? "" : ""}`}>
                                            {formatDate(task.dueDate)} at {getTimeFromDatetime(task.dueDate)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td className="text-white py-2 text-center" colSpan="5">No tasks</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 w-24 bg-green-600 rounded-xl text-white text-sm ${currentPage === 1 ? "bg-slate-400" : ""}`}>Previous</button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 w-24 bg-green-600 rounded-xl text-white ml-2 text-sm ${currentPage === totalPages ? "bg-slate-400" : ""}`}>Next</button>
                    </div>
                </div>
                :
                <TaskEditPopup task={task} openTaskEditPopup={openTaskEditPopup} setOpenTaskEditPopup={setOpenTaskEditPopup} />
        }
        </>
    )
}