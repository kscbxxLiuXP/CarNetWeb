import Login from "../pages/Login";
import Car from "../pages/Car";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error/404";
import NewCar from "../pages/Car/NewCar";
import ViewCar from "../pages/Car/ViewCar";
import NewStaff from "../pages/Staff/NewStaff";
import Staff from "../pages/Staff";
import NewTask from "../pages/Task/NewTask";
import ViewTask from "../pages/Task/ViewTask";
import Task from "../pages/Task/index"
import Settings from "../pages/Settings";
import About from "../pages/About";
import ViewStaff from "../pages/Staff/VieStaff";

//这个文件用来存放所有的路由信息，其他地方将通过循环获取此处的路由信息
//注册路由所绑定的组件信息

//主路由，不需要用户登录就可以访问的页面
export const mainRoutes = [
    {
        path: '/login',
        component: Login,
    }, {
        path: '/404',
        component: Error404,
    }
]

//主页路由，需要用户登录之后才能够访问的路由
export const homeRoutes = [
    {
        path: '/home/dashboard',
        component: Dashboard,
        exact: true,
    },
    {
        path: '/home/car/manage',
        component: Car,
        exact: true,
    },
    {
        path: '/home/car/new',
        component: NewCar,
        exact: true,
    },
    {
        path: '/home/car/manage/:id',
        component: ViewCar,
    },
    {
        path: '/home/staff/manage',
        component: Staff,
        exact: true,
    },
    {
        path: '/home/staff/new',
        component: NewStaff,
        exact: true,
    },
    {
        path: '/home/staff/manage/:id',
        component: ViewStaff,
        exact: true,
    },
    {
        path: '/home/task/manage',
        component: Task,
        exact: true,
    },
    {
        path: '/home/task/new',
        component: NewTask,
        exact: true,
    },
    {
        path: '/home/task/manage/:id',
        component: ViewTask,
    },
    {
        path: '/home/settings',
        component: Settings,
    }, {
        path: '/home/about',
        component: About,
    }
]