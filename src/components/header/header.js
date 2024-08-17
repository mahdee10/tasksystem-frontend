import { useEffect, useState } from "react";
import { useAuth } from "../../auth/authProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePopup from "../profile/profilePopup";
import { useLocation } from "react-router-dom";
export default function Header({ isOpen, setIsOpen, size }) {
    const [imageSrc, setImageSrc] = useState('');
    const [openProfilePopup, setOpenProfilePopup] = useState(false);
    const auth = useAuth();

    function toggleSideBar() {
        if (isOpen)
            setIsOpen(false)
        else
            setIsOpen(true)

    }
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname.split("/")[2]);

    useEffect(()=>{
        setPathname(location.pathname.split("/")[2])
    },[location])
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
            {pathname&&<h1 className="md:block hidden text-white text-3xl font-semibold">{pathname[0].toUpperCase()+pathname.slice(1)}</h1>}
            {size && <MenuIcon onClick={() => toggleSideBar()} className="md:hidden block text-white cursor-pointer" ></MenuIcon>}

            <div className="flex items-center">
                <div className="flex justify-center items-center w-10 h-10 border-2 border-[#FFFFFFB2] rounded-xl text-[#FFFFFFB2]  cursor-pointer hover:text-white">
                    <SettingsIcon style={{ fontSize: 20 }}></SettingsIcon>

                </div>

                {imageSrc &&
                    <img onClick={()=>setOpenProfilePopup(true)} className="ml-2 w-10 h-10 rounded-xl cursor-pointer" src={imageSrc} alt="Profile" />

                }
            </div>
            <ProfilePopup
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                openProfilePopup={openProfilePopup}
                setOpenProfilePopup={setOpenProfilePopup}
            ></ProfilePopup>
        </div>
    )
}