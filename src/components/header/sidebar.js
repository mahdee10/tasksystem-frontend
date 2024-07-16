import { useEffect, useState } from "react";
import { useAuth } from "../../auth/authProvider";
import TaskIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
export default function SideBar({ isOpen, size, setIsOpen }) {
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
                    // console.log(reader.result)
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };

        fetchImage();
    }, [auth.token]);

    function toggleSideBar() {
        if (isOpen)
            setIsOpen(false)
        else
            setIsOpen(true)

    }

    return (
        <div className={`xl:w-[13%] sm:w-[17%]  h-full w-full sm:flex  sm:static transition-transform transform absolute z-10 flex-col  bg-[#1A1A40] sidebar px-3  ${size ? isOpen ? 'translate-x-0' : '-translate-x-full' : "translate-x-0"} `}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap" rel="stylesheet"></link>

            {size &&
                <div className="flex justify-end pt-5">
                    <CloseIcon onClick={() => toggleSideBar()} className="text-white cursor-pointer"></CloseIcon>

                </div>
            }

            <h3 className="text-center text-white sm:text-2xl font-bold sidebar-title text-5xl pt-12">Tasky</h3>
            <div className="flex flex-col grow sm:pt-14 pt-20">
                <div className="text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <TaskIcon className="  "></TaskIcon>
                    <a className="pl-2">Tasks</a>
                </div>

                <div className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <EventIcon className="  "></EventIcon>
                    <a className="pl-2">Events</a>
                </div>
                <div className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <EmojiEventsIcon className="  "></EmojiEventsIcon>
                    <a className="pl-2">Global</a>
                </div>
                <div className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <SettingsIcon className="  "></SettingsIcon>
                    <a className="pl-2">Settings</a>
                </div>
                <div onClick={() => { auth.logOut() }} className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <LogoutIcon className="  "></LogoutIcon>
                    <a className="pl-2">Logout</a>
                </div>
            </div>

        </div>
    )
}