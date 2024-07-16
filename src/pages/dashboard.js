import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import SideBar from "../components/header/sidebar";
import OverView from "./overview";
import Header from "../components/header/header";
// import Section1 from "../components/home/section1";
// import Navbar from "../components/navbar";
// import { useEvent } from "../context/eventContext";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuth();
    const [size, setSize] = useState(false);
    // const {events}=useEvent();

    useEffect(() => {
        if (auth.userData)
            setLoading(false)
        // console.log(auth.userData)
    }, [auth.userData]);

    useEffect(() => {
        document.body.style.backgroundColor = '#1A1A40'; // Change to your desired color

        // Clean up the effect
        return () => {
            document.body.style.backgroundColor = ''; // Reset to original color
        };
    }, []);

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setSize(true)
            }
            else {
                setSize(false)
            }
        };

        handleResize();


        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    

    return (
        <div className="sm:h-screen sm:flex sm:justify-between ">
            <SideBar isOpen={isOpen} size={size} setIsOpen={setIsOpen}/>
            <div className="xl:w-[83%] sm:w-[81%] flex flex-col sm:h-full sm:pr-10 sm:pt-10 px-2 pt-5">
                <Header isOpen={isOpen} setIsOpen={setIsOpen} size={size}/>
                <OverView></OverView>
            </div>
        </div>

    )
}