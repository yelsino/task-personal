import { useContext, useEffect, useReducer } from "react"
import taskApi from "../../apis/taskApi";
import { Task } from "../../interfaces/Tasks";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./TaskReducer";
import moment from "moment";
import { UserContext } from "../user/UserContext";

export interface TaskState {
    isLoading: boolean;
    tasks: Task[],
    todayTasks: Task[],
    selectedTask: Task | null,
    confirmTask: Task | null,
    message: string
}

const INITIAL_STATE: TaskState = {
    isLoading: false,
    tasks: [],
    todayTasks: [],
    selectedTask: null,
    confirmTask: null,
    message: ''

}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const TaskProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE)
    const { user } = useContext(UserContext)

    const getAllTasks = () => {
        taskApi.get(`/tasks/user/${user?.uid}`).then(res => {
            dispatch({
                type: 'GET_ALL_TASKS',
                payload: res.data
            })

            dispatch({
                type: 'GET_TASKS_TODAY',
                payload: getTasksToday(res.data)
            })
        })
    }

    // tareas faltantes de hoy
    const getTasksToday = (tasks: Task[]) => {

        const missingTasks = tasks.filter(({ createdAt }) => {
            return moment(new Date()).format('L') === moment(createdAt).format('L')
        });
        return missingTasks;
    }
    // const create a task
    const createTask = async (task: Task) => {
        const { data } = await taskApi.post('/tasks', task);
        dispatch({ type: 'CREATE_TASK', payload: data });
        getAllTasks()
    }

    const updateTask = async (task: Task) => {
        const { data } = await taskApi.put(`/tasks/${task.uid}`, task);
        dispatch({ type: 'UPDATE_TASK', payload: data });
        getAllTasks()
    }

    const deleteTask = async (task: Task) => {
        await taskApi.delete(`/tasks/${task.uid}`);
        dispatch({ type: 'DELETE_TASK', payload: task });
        getAllTasks()
    }

    const cleanTableTask = async (): Promise<boolean> => {
        dispatch({ type: 'IS_LOADING', payload: true });
        const res = await taskApi.delete('/clean');
        dispatch({ type: 'CLEAN_TABLE_TASK', payload: res.data });
        return res.status === 200 ? true : false;
    }

    const selectTask = (task: Task | null) => {
        dispatch({ type: 'SELECT_TASK', payload: task });
    }

    const selectConfirmTask = (task: Task | null) => {
        dispatch({ type: 'CONFIRM_TASK', payload: task });
    }


    useEffect(() => {
        if (user?.uid) {
            getAllTasks()
        }
    }, [user])

    return (
        <TaskContext.Provider value={{
            ...state,
            dispatch,
            createTask,
            updateTask,
            deleteTask,
            selectTask,
            selectConfirmTask,
            cleanTableTask
        }}
        >
            {children}
        </TaskContext.Provider>
    )
}
