//这个文件是用来显示

export const siderMenu = [
    {
        path: '/home/dashboard',
        title: '首页',
    },
    {
        path: '/home/car',
        title: "工业车辆",
        sub: [
            {
                path: '/home/car/new',
                title: "新增车辆",
            }, {
                path: '/home/car',
                title: "车辆管理",
            }
        ]
    },
    {
        path: '/home/staff',
        title: "员工",
        sub: [

            {
                path: '/home/staff/new',
                title: "注册员工",
            },
            {
                path: '/home/staff',
                title: "员工",
            }
        ]
    }
]