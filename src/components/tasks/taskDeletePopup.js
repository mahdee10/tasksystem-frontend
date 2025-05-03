import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useTask } from '../../context/taskContext';
import { useAuth } from '../../auth/authProvider';

export default function TaskDeletePopup({ openTaskDeletePopup, setOpenTaskDeletePopup, task,setOpenTaskEditPopup }) {
    const { tasks, setTasks } = useTask(); // Get setTasks to update the tasks array
    const { token } = useAuth(); // Get the token for authentication

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://tasksystem-backend.onrender.com/api/Task/${task.taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
            });

            if (response.ok) {
                // Remove the deleted task from the tasks array
                setTasks(tasks.filter(t => t.taskId !== task.taskId));
                setOpenTaskDeletePopup(false); // Close the popup
                setOpenTaskEditPopup(false);
            } else {
                console.error('Failed to delete the task');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className={`${openTaskDeletePopup ? "absolute" : "hidden"} z-[60] flex justify-center items-center backdrop-blur-md  sm:p-5 border-white sm:border-2 w-full h-full inset-0`}>
            <div className='w-3/4 h-1/2'>
                <h2 className="font-bold text-[#c69320] sm:text-2xl text-xl text-center h-fit">Are you Sure you Want to Delete</h2>
                <div className="w-full flex justify-center mt-6 h-fit">
                    <button onClick={() => { setOpenTaskDeletePopup(false) }} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff] mr-1">Cancel</button>
                    <div onClick={handleDelete} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6 bg-red-600 cursor-pointer text-center">Delete</div>
                </div>
            </div>
        </div>
    );
}
