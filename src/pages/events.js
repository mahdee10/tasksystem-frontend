import TableEvents from "../components/events/tableEvents";


export default function Events() {
    // const [openTaskPopup, setOpenTaskPopup] = useState(false);
    return (
        <div className=" flex-grow  pt-14 text-white ">
            <div className="flex sm:justify-end justify-between mb-5 py-2">
                <h1 className="sm:hidden block text-center  text-2xl ">Events</h1>
                {/* <button onClick={() => setOpenTaskPopup(true)} className="px-2 py-1 bg-green-600 rounded-xl text-white ">+ Add Task</button> */}
            </div>
            <TableEvents />
        </div>
    )
}