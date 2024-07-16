import { useEffect, useState } from "react";
import { useAuth } from "../../auth/authProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
export default function Header({ isOpen, setIsOpen, size }) {
    const [imageSrc, setImageSrc] = useState('');
    const auth = useAuth();

    function toggleSideBar() {
        if (isOpen)
            setIsOpen(false)
        else
            setIsOpen(true)

    }

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
                    // console.log(reader.result)
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };

        fetchImage();
    }, [auth.token]);
    return (
        <div className="flex justify-between items-center h-fit">
            <h1 className="sm:block hidden text-white text-3xl font-semibold">OverView</h1>
            {size&&<MenuIcon onClick={()=>toggleSideBar()} className="sm:hidden block text-white cursor-pointer" ></MenuIcon>}

            <div className="flex items-center">
                <div className="flex justify-center items-center w-10 h-10 border-2 border-[#FFFFFFB2] rounded-xl text-[#FFFFFFB2]  cursor-pointer hover:text-white">
                    <SettingsIcon style={{ fontSize: 20 }}></SettingsIcon>

                </div>

                {imageSrc &&
                    <img className="ml-2 w-10 h-10 rounded-xl" src={imageSrc} alt="Profile" />

                }
            </div>
        </div>
    )
}