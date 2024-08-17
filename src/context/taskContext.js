import { useContext, createContext, useState } from "react";
import { useAuth } from "../auth/authProvider";
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(null);
    // const { token } = useAuth();
     

    return <TaskContext.Provider value={{  tasks,setTasks }}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useTask = () => {
    return useContext(TaskContext);
};