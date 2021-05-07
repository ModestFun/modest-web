import NotFound from "./notFound.js";
import Home from "../component/article/home";
import About from '../component/About/About';
import FriendLink from '../component/FriendLink/FriendLink';
import Career from '../component/Career/Career';
//  IP 端口  -  测试
// export const fileIp = {
//     defaultIp: "http://49.233.56.6:8080",
//     onLineIp: "https://www.modestfun.com"
// }
export const fileIp = {
    defaultIp: "https://www.modestfun.com:8080",
    onLineIp: "https://www.modestfun.com"
}
// IP 端口  -  开发
// export const fileIp = {
//     defaultIp: "http://localhost:8840",
//     otherIp: "http://localhost:9969",
//     onLineIp: "http://localhost:3000"
// }
// 主要路由
export const mainRoutes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/404",
        component: NotFound,
        exact: true
    },
    // {
    //     path: "/login",
    //     component: Login,
    //     exact: true
    // },
    {
        path: "/tags/:name",
        component: Home,
        exact: true
    },
    {
        path: "/career",
        component: Career,
        exact: true
    },
    // {
    //     path: "/interact",
    //     component: Interact,
    //     exact: true
    // },
    {
        path: "/friendLink",
        component: FriendLink,
        exact: true
    },
    {
        path: "/about",
        component: About,
        exact: true
    },

]

// 二级路由
export const blogRoutes = [
    {
        path: "/blog/:id",
        exact: true
    }
]






