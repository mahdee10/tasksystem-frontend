import OverviewSection1 from "../components/overview/Section1";
import { useEvent } from "../context/eventContext";
import { useTask } from "../context/taskContext";

export default function OverView() {
    const { events } = useEvent();
    const { tasks } = useTask();
    return (
        <div className=" flex-grow flex pt-14">
           <OverviewSection1/>
        </div>
    )
}