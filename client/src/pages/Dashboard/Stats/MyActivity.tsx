import moment from "moment";
import { Task } from "../../../interfaces/Tasks";
import LightBar from "./LightBar";

interface Props {
  tasksByDays: [string, Task[]][]
}

export const MyActivity = ({ tasksByDays }: Props) => {

  // create a array with 7 elements and fill it with [string, Task[]]
  const sevenDays = Array.from(Array(7).keys()).map(i => [moment().subtract(i, "days").format("YYYY-MM-DD"), [{ status: false }]] as [string, Task[]]);

  const totalbyday = 7 - tasksByDays.slice(-7).length

  return (
    <div className="col-span-2  rounded-full p-5 flex font-poppins gap-x-5 items-center bg-primary-100">

      <div className="flex flex-col items-center text-secondary-200 font-bold text-sm">
        <span>My</span>
        <span>Activity</span>
      </div>
      <div className={`flex gap-x-3 text-xs ${tasksByDays.length >= 1 ? 'justify-start' : 'justify-center'}   w-full`}>
        {
          tasksByDays.slice(-7).map(([date, tasks]) => (
            <LightBar key={date} tasksToday={tasks} date={date} />
          ))
        }
        {
          tasksByDays.length < 7 &&
          sevenDays.slice(-totalbyday).map(([date, tasks]) => (
            <LightBar key={date} tasksToday={tasks} date={date} />
          ))
        }
      </div>
    </div>
  );
};


