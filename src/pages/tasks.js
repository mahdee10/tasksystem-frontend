import { useState } from "react";
import TableTasks from "../components/tasks/tableTasks";
import TaskPopup from "../components/tasks/taskPopup";
import TaskEditPopup from "../components/tasks/taskEditPopup";

export default function Tasks() {
    const [openTaskPopup, setOpenTaskPopup] = useState(false);
    return (
        <>
            {
                !openTaskPopup ?
                    <div className=" flex-grow  pt-14 text-white ">
                        <div className="flex sm:justify-end justify-between mb-5 py-2">
                            <h1 className="sm:hidden block text-center  text-2xl ">Tasks</h1>
                            <button onClick={() => setOpenTaskPopup(true)} className="px-2 py-1 bg-green-600 rounded-xl text-white ">+ Add Task</button>
                        </div>
                        <TableTasks />
                    </div>
                    :
                    
                    <TaskPopup openTaskPopup={openTaskPopup} setOpenTaskPopup={setOpenTaskPopup}/>
                    
                    
            }
        </>
    )
}