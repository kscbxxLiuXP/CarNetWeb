//这个文件是用来显示

export const siderMenu = [
    {
        path: '/home/dashboard',
        title: '首页',
        icon: 'icon-home',
    },
    {
        path: '/home/car',
        title: "工业车辆",
        icon: 'icon-car',
        sub: [
            {
                path: '/home/car/new',
                title: "新增车辆",
                icon: 'icon-newcar',
            }, {
                path: '/home/car/manage',
                title: "车辆管理",
                icon: 'icon-carManage',
            }
        ]
    },
    {
        path: '/home/staff',
        title: "员工",
        icon: 'icon-staff',
        sub: [

            {
                path: '/home/staff/new',
                title: "注册员工",
                icon: 'icon-newStaff',
            },
            {
                path: '/home/staff/manage',
                title: "员工管理",
                icon: 'icon-staffManage',
            }
        ]
    },
    {
        path: '/home/task',
        title: "任务",
        icon: 'icon-task',
        sub: [

            {
                path: '/home/task/new',
                title: "发布任务",
                icon: 'icon-newTask',
            },
            {
                path: '/home/task/manage',
                title: "任务管理",
                icon: 'icon-taskManage',
            }
        ]
    },
    {
        path: '/home/settings',
        title: '设置',
        icon: 'icon-settings',
    },
    {

        path: '/home/about',
        title: '关于',
        icon: 'icon-about',
    }
]