import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import Navbar from "../components/navbar";

export default function Dashboard() {
    const [member, SetMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const token = auth.token 

                const response = await fetch('https://localhost:7152/api/Member/getme', {
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
                SetMember(data);
            } catch (error) {
                console.error('Error fetching preferences:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [auth.token]);


    return (
        <div className="">
            <Navbar></Navbar>
            <div className="h-screen text-3xl text-white flex justify-center items-center">
                Hello
            </div>
        </div>

    )
}