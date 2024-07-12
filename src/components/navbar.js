import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
export default function Navbar() {
    const [imageSrc, setImageSrc] = useState('');
    const auth = useAuth();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const token = auth.token
                const response = await fetch('https://localhost:7152/api/Profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                    console.log(reader.result)
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };

        fetchImage();
    }, [auth.token]);


    return (
        <div className="fixed flex justify-between items-center pt-12 sm:px-28 px-3 w-full">
            {imageSrc &&
                <img className="sm:w-14 sm:h-14 w-10 h-10 rounded-full" src={imageSrc} alt="Profile" />}
            <div className="flex justify-end w-fit">
                <div className="text-[#FFFFFFB2] hover:text-[#1A1A40] items-center text-lg cursor-pointer px-4" >profile</div>
                <div className="text-[#FFFFFFB2] hover:text-[#1A1A40] items-center text-lg cursor-pointer px-4" >settings</div>
                <div className="text-[#FFFFFFB2] hover:text-[#1A1A40] items-center text-lg cursor-pointer pl-4" onClick={() => { auth.logOut() }}>logout</div>
            </div>

        </div>
    )
}