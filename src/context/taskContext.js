import { useContext, createContext, useState } from "react";
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(null);

    return <TaskContext.Provider value={{  tasks,setTasks }}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useTask = () => {
    return useContext(TaskContext);
};