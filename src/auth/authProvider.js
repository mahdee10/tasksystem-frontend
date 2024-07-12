import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const signupAction = async (data) => {
        try {
            const response = await fetch("https://localhost:7152/api/Account/register", {
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
                console.log(res)
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
            const response = await fetch("https://localhost:7152/api/Account/login", {
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
                console.log(res);
                setUser(res.username);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
    
        } catch (err) {
            return err.message;
        }
    };


    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        // navigate("/login")
    }


    return <AuthContext.Provider value={{ token, user, signupAction, logOut,loginAction }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};