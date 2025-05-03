import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/eventContext";
import { useTask } from "../context/taskContext";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const {setEvents}=useEvent();
    const {setTasks}=useTask();
    const navigate = useNavigate();

    
    const signupAction = async (data) => {
        try {
            const response = await fetch("https://tasksystem-backend.onrender.com/api/Account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // If response is not okay, parse and throw an error
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const res = await response.json();


            if (res) {
                setUser(res.username);
                setToken(res.token);
                
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }


        } catch (err) {
            return err.message;
        }

    }
    const loginAction = async (data) => {
        try {
            const response = await fetch("https://tasksystem-backend.onrender.com/api/Account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // If response is not okay, attempt to parse and throw an error
                const errorData = await response.text();
                throw new Error(errorData || 'Unknown error occurred');
            }

            const res = await response.json();

            if (res) {

                setUser(res.username);
                console.log(res.token)
                setToken(res.token);
                

                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }

        } catch (err) {
            return err.message;
        }
    };

    useEffect(() => {
        const fetchPreferences = async () => {
            try {


                const response = await fetch('https://tasksystem-backend.onrender.com/api/Member/getme', {
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
                console.log(data)

                console.log(data.tasks)
                setEvents(data.events);
                setTasks(data.tasks);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching preferences:', error);
            }
        };
        if (token) {
            fetchPreferences();
        }
    }, [token]);





    const logOut = () => {
        setUser(null);
        setToken("");
        setUserData(null);
        localStorage.removeItem("site");
        // navigate("/login")
    }


    return <AuthContext.Provider value={{ token, user, signupAction, logOut, loginAction, setUserData, userData }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};