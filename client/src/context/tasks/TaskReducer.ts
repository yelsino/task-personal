import { Task } from "../../interfaces/Tasks";
import { TaskState } from "./TaskProvider";

export type TaskAction =
  | { type: "GET_TASKS_TODAY"; payload: Task[] }
  | { type: "GET_ALL_TASKS"; payload: Task[] }
  | { type: "CREATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "SELECT_TASK"; payload: Task | null }
  | { type: "CONFIRM_TASK"; payload: Task | null }
  | { type: "CLEAN_TABLE_TASK"; payload: string }
  | { type: "IS_LOADING"; payload: boolean };

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "GET_TASKS_TODAY":
      return {
        ...state,
        todayTasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        ...state,
        todayTasks: [...state.todayTasks, action.payload],
        // tasks: [action.payload, ...state.tasks]
      };
    case "UPDATE_TASK":
      return {
        ...state,
        todayTasks: state.todayTasks.map((task) =>
          task.uid === action.payload.uid ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        todayTasks: state.todayTasks.filter(
          (task) => task.uid !== action.payload.uid
        ),
      };

    case "SELECT_TASK":
      return {
        ...state,
        selectedTask: action.payload,
      };

    case "CONFIRM_TASK":
      return {
        ...state,
        confirmTask: action.payload,
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "CLEAN_TABLE_TASK":
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        tasks: [],
        todayTasks: [],
        selectedTask: null,
        confirmTask: null,
      };

    default:
      return state;
  }
};
