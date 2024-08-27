import { useState } from "react";
import TableTasks from "../components/tasks/tableTasks";
import TaskPopup from "../components/tasks/taskPopup";
import TaskEditPopup from "../components/tasks/taskEditPopup";
import TaskFilterDropdown from "../components/tasks/filterButton";

export default function Tasks() {
    const [openTaskPopup, setOpenTaskPopup] = useState(false);
    const [filterTasks, setFilterTasks] = useState("all");

    return (
        <>
            {
                !openTaskPopup ?
                    <div className=" flex-grow  sm:pt-14 pt-6 text-white ">
                        <div className="flex  justify-between mb-5 py-2 flex-wrap">
                            <h1 className="sm:hidden block text-center  text-2xl w-full sm:mb-0 mb-5">Tasks</h1>
                            <div className="w-fit flex items-center">
                                <span className="text-white mr-2 text-lg">{filterTasks[0].toUpperCase()+filterTasks.slice(1)} Tasks</span>
                                <TaskFilterDropdown setFilterTasks={setFilterTasks}></TaskFilterDropdown>
                            </div>
                            <button onClick={() => setOpenTaskPopup(true)} className="px-2 py-1 bg-green-600 rounded-xl text-white ">+ Add Task</button>

                        </div>
                        <TableTasks filterTasks={filterTasks} />
                    </div>
                    :

                    <TaskPopup openTaskPopup={openTaskPopup} setOpenTaskPopup={setOpenTaskPopup} />


            }
        </>
    )
}