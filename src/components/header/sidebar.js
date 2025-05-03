import { useEffect, useState } from "react";
import { useAuth } from "../../auth/authProvider";
import TaskIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { Link, useLocation } from "react-router-dom";
export default function SideBar({ isOpen, size, setIsOpen }) {
    const [imageSrc, setImageSrc] = useState('');


    const auth = useAuth();
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    useEffect(() => {
        setPathname(location.pathname);
        console.log(location.pathname)
    }, [location.pathname]);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const token = auth.token
                const response = await fetch('https://tasksystem-backend.onrender.com/api/Profile', {
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
        <div className={`xl:w-[13%] md:w-[17%]  h-full w-full md:flex  md:static transition-transform transform absolute z-10 flex-col  bg-[#1A1A40] sidebar px-3  ${size ? isOpen ? 'translate-x-0' : '-translate-x-full' : "translate-x-0"} `}>
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
                <Link onClick={() => toggleSideBar()} to="/dashboard/overview" className={`text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3 ${pathname === "/dashboard/overview" ? "text-white bg-[#8758ff]" : ""}`}>
                    <EqualizerIcon className="  "></EqualizerIcon>

                    <span className="pl-2">Overview</span>
                </Link>
                <Link onClick={() => toggleSideBar()} to="/dashboard/tasks" className={`mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3 ${pathname === "/dashboard/tasks" ? "text-white bg-[#8758ff]" : ""}`}>
                    <TaskIcon className="  "></TaskIcon>
                    {/* < to="/dashboard/tasks" className="pl-2">Tasks</> */}

                    <span className="pl-2">Tasks</span>
                </Link>

                <Link onClick={() => toggleSideBar()} to="/dashboard/events" className={`mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3 ${pathname === "/dashboard/events" ? "text-white bg-[#8758ff]" : ""}`}>
                    <EventIcon className="  "></EventIcon>
                    <span className="pl-2">Events</span>
                </Link>
                <Link onClick={() => toggleSideBar()} className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <EmojiEventsIcon className="  "></EmojiEventsIcon>
                    <span className="pl-2">Global</span>
                </Link>
                <Link onClick={() => toggleSideBar()} className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <SettingsIcon className="  "></SettingsIcon>
                    <span className="pl-2">Settings</span>
                </Link>
                <div  onClick={() => { auth.logOut() }} className="mt-2 text-[#FFFFFFB2] flex cursor-pointer hover:text-white hover:bg-[#8758ff] rounded-2xl px-2 py-3">
                    <LogoutIcon className="  "></LogoutIcon>
                    <a className="pl-2">Logout</a>
                </div>
            </div>

        </div>
    )
}