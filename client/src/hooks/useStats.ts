import moment from "moment";
import { useEffect, useState } from "react";
import { Task } from "../interfaces/Tasks";

interface Props {
  tasks: Task[];
}

export const useStats = ({ tasks }: Props) => {
  const [total, setTotal] = useState(0);
  const [missing, setMissing] = useState(0);
  const [finished, setFinished] = useState(0);

  // todas las tareas de todos los dias
  const getTotalTasks = () => {
    setTotal(tasks.length);
  };

  // tareas faltantes de hoy
  const getMissingTasksToday = () => {
    const missingTasks = tasks.filter(({ status, createdAt }) => {
      return (
        moment(new Date()).format("L") === moment(createdAt).format("L") &&
        status === false
      );
    });
    setMissing(missingTasks.length);
  };

  // tareas completadas de hoy
  const getFinishedTasksToday = () => {
    const finishTasks = tasks.filter(({ status, createdAt }) => {
      return (
        moment(new Date()).format("L") === moment(createdAt).format("L") &&
        status === true
      );
    });
    setFinished(finishTasks.length);
  };

  // tareas organizadas por dias [day:'', tasks: []][]
  const tasksByDays = Object.entries(
    tasks.reduce((acc, task) => {
      const date = moment(new Date()).format("L");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {} as { [key: string]: Task[] })
  );

  // ejecutate cada vez que se actualize tasks
  useEffect(() => {
    getTotalTasks();
    getMissingTasksToday();
    getFinishedTasksToday();
  }, [tasks]);

  return {
    total,
    missing,
    finished,
    tasksByDays,
  };
};
