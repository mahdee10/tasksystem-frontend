import { useContext, createContext, useState } from "react";
const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(null);

    return <EventContext.Provider value={{  events,setEvents }}>{children}</EventContext.Provider>;
};

export default EventProvider;

export const useEvent = () => {
    return useContext(EventContext);
};