import { SubTitle } from "../../../components/Atoms/SubTitle";
import { useStats } from "../../../hooks/useStats";
import { Task } from "../../../interfaces/Tasks";
import { ItemStats } from "./ItemStats";
import { MyActivity } from "./MyActivity";

interface Props {
  tasks: Task[];
}

export const Stats = ({ tasks }: Props) => {

  const { total, missing, finished, tasksByDays } = useStats({ tasks });

  return (
    <div className="flex flex-col gap-y-5">
      <SubTitle text="Sus estadisticas" />
      <div className="grid grid-cols-30/70 gap-2 gap-y-5 ">
        <div className="row-span-2 rounded-[30px]  flex justify-center items-center flex-col bg-primary-100">
          <ItemStats number={total} text={'creadas'} icon={true} />
        </div>

        <ItemStats number={missing} text={'pendientes'} />
        <ItemStats number={finished} text={'finalizadas'} />

        <MyActivity tasksByDays={tasksByDays} />
      </div>
    </div>
  );
};
