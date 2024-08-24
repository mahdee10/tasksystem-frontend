import { useAuth } from '../../auth/authProvider';
import { useEvent } from '../../context/eventContext';

export default function EventDeletePopup({ openEventDeletePopup, setOpenEventDeletePopup, eventt,setOpenEventEditPopup }) {
    const { events, setEvents } = useEvent(); // Get setEvents to update the events array
    const { token } = useAuth(); // Get the token for authentication

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7152/api/Event/${eventt.eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
            });

            if (response.ok) {
                // Remove the deleted event from the events array
                setEvents(events.filter(e => e.eventId !== eventt.eventId));
                setOpenEventDeletePopup(false); // Close the popup
                setOpenEventEditPopup(false);
            } else {
                console.error('Failed to delete the event');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className={`${openEventDeletePopup ? "absolute" : "hidden"} z-[60] flex justify-center items-center backdrop-blur-md  sm:p-5 border-white sm:border-2 w-full h-full inset-0`}>
            <div className='w-3/4 h-1/2'>
                <h2 className="font-bold text-[#c69320] sm:text-2xl text-xl text-center h-fit">Are you Sure you Want to Delete</h2>
                <div className="w-full flex justify-center mt-6 h-fit">
                    <button onClick={() => { setOpenEventDeletePopup(false) }} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff] mr-1">Cancel</button>
                    <div onClick={handleDelete} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6 bg-red-600 cursor-pointer text-center">Delete</div>
                </div>
            </div>
        </div>
    );
}
