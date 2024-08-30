import { useEffect, useState } from "react";
import TableTasks from "../components/tasks/tableTasks";
import TaskPopup from "../components/tasks/taskPopup";
import TaskEditPopup from "../components/tasks/taskEditPopup";
import TaskFilterDropdown from "../components/tasks/filterButton";
import TaskHeader from "../components/tasks/taskHeader";

export default function Tasks() {
    const [openTaskPopup, setOpenTaskPopup] = useState(false);
    const [filterTasks, setFilterTasks] = useState("all");
    const [searchedTasks, setSearchedTasks]=useState();
    const [title, setTitle] = useState("");


    useEffect(()=>{
        console.log(searchedTasks)
    },[searchedTasks])
    return (
        <>
            {
                !openTaskPopup ?
                    <div className=" flex-grow  sm:pt-14 pt-6 text-white ">
                        <TaskHeader title={title} setTitle={setTitle} searchedTasks={searchedTasks} setSearchedTasks={setSearchedTasks} setOpenTaskPopup={setOpenTaskPopup} setFilterTasks={setFilterTasks} filterTasks={filterTasks}></TaskHeader>
                        <TableTasks setTitle={setTitle} filterTasks={filterTasks} searchedTasks={searchedTasks}/>
                    </div>
                    :

                    <TaskPopup openTaskPopup={openTaskPopup} setOpenTaskPopup={setOpenTaskPopup} />


            }
        </>
    )
}