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
        show: true,
        title: '首页',
    },
    {
        path: '/home/car',
        component: Car,
        exact: true,
        show: true,
        title: "车辆",
    },
    {
        path: '/home/car/:id',
        component: Car,
        show: false

    }
]