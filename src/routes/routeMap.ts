import { ComponentType } from "react";
import { ComponentDetails, ComponentHome } from "../pages";

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
        path: "Details",
    },
];

export default routeMap;