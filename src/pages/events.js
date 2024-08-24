import { useState } from "react";
import TableEvents from "../components/events/tableEvents";
import EventAddPopup from "../components/events/eventAddPopup";


export default function Events() {
    const [openEventPopup, setOpenEventPopup] = useState(false);
    return (
        <>
        <div className=" flex-grow  pt-14 text-white ">
            <div className="flex sm:justify-end justify-between mb-5 py-2">
                <h1 className="sm:hidden block text-center  text-2xl ">Events</h1>
                <button onClick={() => setOpenEventPopup(true)} className="px-2 py-1 bg-green-600 rounded-xl text-white ">+ Add Event</button>
            </div>
            <TableEvents />
        </div>
        <EventAddPopup openEventPopup={openEventPopup} setOpenEventPopup={setOpenEventPopup}/>
        </>

    )
}