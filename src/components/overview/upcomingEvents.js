import { useEffect, useState } from "react";
import { useEvent } from "../../context/eventContext";


export default function UpComingEvents() {
    const { events } = useEvent();
    const [upcomingEvents,setUpComingEvents]=useState(null);


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


    function formatDate(dateStr) {
        const date = new Date(dateStr);

        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).split('/').join('-');
    
        return formattedDate;
    }
    return (

            <div className="rounded-2xl  lg:h-full  h-auto md:w-[30%] w-fit flex flex-col sm:p-2 p-5 bg-[#8758ff] sm:mt-0 mt-5">
                <h2 className="text-[#1A1A40] text-center xl:text-xl lg:text-base font-bold mb-4">Upcoming Events</h2>
                { upcomingEvents?
                    upcomingEvents.map((event) => (
                        <div className="text-white py-2 xl:px-3 px-0 flex justify-between">
                            <p className="xl:text-base text-xs">{event.title}</p>
                            <p className="xl:text-base text-xs">{formatDate(event.date)}</p>
                        </div>
                    ))
                    :
                    <div className="text-white py-2 flex justify-between">No coming events</div>
                }
            </div>

          
    )
}