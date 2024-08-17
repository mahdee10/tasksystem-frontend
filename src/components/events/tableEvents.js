
// import CloseIcon from '@mui/icons-material/Close';
// import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
// import TaskEditPopup from "./taskEditPopup";
import { useEvent } from "../../context/eventContext";

export default function TableEvents() {
    const { events } = useEvent();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    // const [openTaskEditPopup, setOpenTaskEditPopup] = useState(false);
    const [trHover, setTrHover] = useState({
        taskId: -1,
        hover: false
    });
    const [event, setEvent] = useState(null);
    const eventsPerPage = 5;

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }).split('/').join('-');


        return formattedDate;
    }

    function getTimeFromDatetime(datetime) {
        // Create a new Date object from the datetime string
        const date = new Date(datetime);

        // Extract the hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format the hours and minutes to ensure they are always two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Combine hours and minutes with a colon
        const timeString = `${formattedHours}:${formattedMinutes}`;

        return timeString;
    }

    useEffect(() => {
        if (events) {
            // Calculate the indices for slicing the tasks array
            const indexOfLastEvent = currentPage * eventsPerPage;
            const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
            const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
            setCurrentEvents(currentEvents)
            // Calculate total pages
            const totalPages = Math.ceil(events.length / eventsPerPage);
            setTotalPages(totalPages)
        }
        // console.log(tasks, "table")
    }, [events, currentPage])

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEventClick = (event) => {
        setEvent(event)
        // setOpenTaskEditPopup(true);
    }

    return (
        <>      {
            // !openTaskEditPopup ?
                <div>
                    <div className="overflow-x-auto w-full table-container ">
                        <table className="bg-[#8758ff] w-full min-w-max min-h-max">
                            <thead>
                                <tr>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Title</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-pretty text-[#1A1A40] ">Description</th>
                                    <th className="sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] text-[#1A1A40]">Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentEvents.length ? currentEvents.map((event) => (
                                    <tr
                                        onMouseEnter={() => (setTrHover({
                                            eventId: event.eventId,
                                            hover: true
                                        }))}
                                        onMouseLeave={() => (setTrHover({
                                            eventId: -1,
                                            hover: false
                                        }))}

                                        className={`tr-hover border-solid z-10 cursor-pointer ${trHover.eventId === event.eventId ? "border-2 border-green-500" : ""}`} key={event.id} onClick={() => { handleEventClick(event) }}>

                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] ${trHover.eventId === event.eventId ? "" : ""}`}
                                        >{event.title}</td>
                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] description-column ${trHover.eventId === event.eventId ? " " : ""}`}>{event.description}</td>


                                        <td
                                            className={`sm:p-2 sm:text-base text-xs p-1 border-2 border-[#2c2b34] ${trHover.eventId === event.eventId ? "" : ""}`}>
                                            {formatDate(event.date)} at {getTimeFromDatetime(event.date)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td className="text-white py-2 text-center" colSpan="5">No events</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 w-24 bg-green-600 rounded-xl text-white text-sm ${currentPage === 1 ? "bg-slate-400" : ""}`}>Previous</button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 w-24 bg-green-600 rounded-xl text-white ml-2 text-sm ${currentPage === totalPages ? "bg-slate-400" : ""}`}>Next</button>
                    </div>
                </div>
                // :
                // <TaskEditPopup task={task} openTaskEditPopup={openTaskEditPopup} setOpenTaskEditPopup={setOpenTaskEditPopup} />
        }
        </>
    )
}