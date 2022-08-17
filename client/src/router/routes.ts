import { lazy, LazyExoticComponent } from "react";
import MyName from "../pages/MyName/MyName";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

const TaskLazy = lazy(() => import("../pages/Taks/Tasks"));

const DashboardLazy = lazy(() => import("../pages/Dashboard/Dashboard"));

export const routes: Route[] = [
  {
    path: "/tareas/*",
    to: "/tareas/",
    Component: TaskLazy,
    name: "tareas",
  },
  {
    to: "/estadisticas",
    path: "estadisticas",
    Component: DashboardLazy,
    name: "estadisticas",
  },
  {
    to: "/mi-nombre",
    path: "mi-nombre",
    Component: MyName,
    name: "mi-nombre",
  }

];
