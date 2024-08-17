import { useEffect, useState } from "react";
import { useTask } from "../../context/taskContext";
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
export default function TasksOverview() {
    const { tasks } = useTask();
    const [nearestTasks, setNearestTasks] = useState(null);


    useEffect(() => {
        if (tasks) {
            function sortTasksByDate(tasks) {
                return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            }

            const sortedTasks = sortTasksByDate(tasks);
            const nearestTasks = sortedTasks.slice(0, 3);
            setNearestTasks(nearestTasks);

        }
    }, [tasks])






    return (

        <div className="rounded-2xl lg:h-full h-fit md:w-[30%] w-fit flex flex-col sm:p-2 p-5 bg-[#8758ff] sm:mt-0 mt-5">
            <h2 className="text-[#1A1A40] text-center xl:text-xl lg:text-base font-bold mb-4">Nearest Tasks Status</h2>
            {nearestTasks ?
                nearestTasks.map((task) => (
                    <div key={task.taskId} className="text-white py-2 xl:px-3 px-0 flex justify-between">
                        <p className="xl:text-base text-xs">{task.title}</p>
                        
                        {task.isDone ?
                            <DoneIcon className="text-green-600" /> :
                            <DoNotDisturbIcon className="text-red-600 " />

                        }
                    </div>
                ))
                :
                <div className="text-white py-2 flex justify-between">No tasks</div>
            }
        </div>


    )
}