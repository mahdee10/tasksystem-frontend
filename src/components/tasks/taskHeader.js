import { useEffect, useState } from "react";
import TaskFilterDropdown from "./filterButton";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "../../auth/authProvider";
export default function TaskHeader({ setFilterTasks, filterTasks, setOpenTaskPopup, setSearchedTasks,setTitle, title }) {

    const { token } = useAuth();
    const [debounceTimeout, setDebounceTimeout] = useState(null);


    useEffect(()=>{
        if(!title){
          setSearchedTasks(null)
        }
    },[title])
    // Function to call API
    const fetchTasks = async (title) => {

        try {
            const response = await fetch(`https://localhost:7152/api/Task/mytasks?Title=${title}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(title)
            console.log(data)
            setSearchedTasks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Debounced input change handler
    const handleInputChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        // Clear the existing timeout if the user is still typing
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout to trigger the API call after 300ms of inactivity
        const timeout = setTimeout(() => {
            fetchTasks(newTitle);
        }, 300);

        // Save the timeout reference
        setDebounceTimeout(timeout);
    };



    return (
        <div className="flex  justify-between mb-5 py-2 flex-wrap">
            <h1 className="sm:hidden block text-center  text-2xl w-full sm:mb-0 mb-5">Tasks</h1>
            <div className="w-fit flex items-center">

                <div className="signup-input mr-3 h-fit border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-62  flex items-center sm:rounded-none rounded-md">

                    <input

                        type="text"
                        placeholder="Search for Tasks"
                        className="w-full  pl-2  bg-transparent text-white "
                        name="name"
                        onChange={handleInputChange}
                        value={title}
                    />
                    <SearchIcon className=" text-white "></SearchIcon>
                </div>

                <span className="text-white mr-2 text-lg">{filterTasks[0].toUpperCase() + filterTasks.slice(1)} Tasks</span>
                <TaskFilterDropdown setFilterTasks={setFilterTasks}></TaskFilterDropdown>
            </div>
            <button onClick={() => setOpenTaskPopup(true)} className="px-2 py-1 bg-green-600 rounded-xl text-white ">+ Add Task</button>

        </div>
    )
}