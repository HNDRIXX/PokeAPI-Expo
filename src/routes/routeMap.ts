import { ComponentType } from "react";
import { ComponentHome, ComponentDetails } from "../pages";

interface RouteType {
    component: ComponentType<any>;
    path: string;
}

const routeMap: Array<RouteType> = [
    {
        component: ComponentHome,
        path: "Home",
    },
    {
        component: ComponentDetails,
        path: "Second",
    },
];

export default routeMap;