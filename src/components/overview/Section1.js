
import UpComingEvents from "./upcomingEvents";
import TasksOverview from "./tasksOverview";


export default function OverviewSection1() {

    return (
        <div className=" flex sm:flex-row  flex-wrap sm:justify-between  xl:h-[39%]  h-fit  xl:items-start items-stretch  w-full justify-around">
            <UpComingEvents/>
            <TasksOverview/>
            <UpComingEvents/>

        </div>
    )
}