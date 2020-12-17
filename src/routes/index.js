import Login from "../pages/Login";
import Car from "../pages/Car";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error/404";

export const mainRoutes = [
    {
        path: '/login',
        component: Login,
    }, {
        path: '/404',
        component: Error404,
    }
]
export const homeRoutes = [
    {
        path: '/home/dashboard',
        component: Dashboard,
    },
    {
        path: '/home/car',
        component: Car,
        exact: true,
    },
    {
        path: '/home/car/:id',
        component: Car

    }
]