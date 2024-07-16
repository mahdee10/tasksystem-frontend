import { useEffect, useState } from "react";
import { useEvent } from "../../context/eventContext";
import { useTask } from "../../context/taskContext";
import UpComingEvents from "./upcomingEvents";


export default function OverviewSection1() {
    const { events } = useEvent();
    const [upcomingEvents,setUpComingEvents]=useState(null);
    console.log(events);


    

    useEffect(()=>{
        if(events){
            function sortEventsByDate(events) {
                return events.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
        
            const sortedEvents = sortEventsByDate(events);
            const nearestEvents = sortedEvents.slice(0, 3);
            setUpComingEvents(nearestEvents);

        }
    },[events])

    // const { tasks } = useTask();

    function formatDate(dateStr) {
        // Create a Date object from the input date string
        const date = new Date(dateStr);
    
        // Format the date as dd-mm-yyyy using toLocaleDateString
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).split('/').join('-');
    
        return formattedDate;
    }
    return (
        <div className="flex sm:flex-row  flex-wrap sm:justify-between sm:h-[39%] w-full justify-around">
            <UpComingEvents/>
            <UpComingEvents/>
            <UpComingEvents/>

        </div>
    )
}