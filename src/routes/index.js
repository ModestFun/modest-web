import NotFound from "./notFound.js"
import HomePage from "../JSComponent/homepage/homepage"
import Login from "../JSComponent/admin/login"
import createArticle from "../JSComponent/admin/pages/createArticle"
import managementArticle from "../JSComponent/admin/pages/managementArticle"
import Home from "../JSComponent/admin/pages/home"
import updateArticle from "../JSComponent/admin/pages/updateArticle"
import commentHandle from "../JSComponent/admin/pages/commentHandle"
import PicStore from "../JSComponent/admin/pages/PicStore"
import commentDetail from "../JSComponent/admin/pages/commentDetail"
import FriendLink from "../JSComponent/FriendLink/FriendLink.js"
import Career from "../JSComponent/Career/Career.js"
import About from "../JSComponent/About/About.js"
import Interact from "../JSComponent/Interact/Interact.js"
import InteractAdmin from "../JSComponent/admin/pages/InteractAdmin"
import FriendManage from "../JSComponent/admin/pages/FriendLink"
import CareerOption from "../JSComponent/admin/pages/CareerOption"
import FriendHandle from "../JSComponent/admin/pages/FriendHandle"
import UpdataFriend from "../JSComponent/admin/pages/UpdataFriend"

// 主要路由
export const mainRoutes = [
    {
        path: "/",
        component: HomePage,
        exact: true
    },
    {
        path: "/404",
        component: NotFound,
        exact: true
    },
    {
        path: "/login",
        component: Login,
        exact: true
    },
    {
        path: "/tags/:name",
        component: HomePage,
        exact: true
    },
    {
        path: "/career",
        component: Career,
        exact: true
    },
    {
        path: "/interact",
        component: Interact,
        exact: true
    },
    {
        path: "/friendLink",
        component: FriendLink,
        exact: true
    }, {
        path: "/about",
        component: About,
        exact: true
    },

]

// 二级路由
export const adminRoutes = [
    {
        path: "/admin",
        component: Home,
        exact: true,
        isShow: false
    },
    {
        path: "/admin/updateArticle/:id",
        component: updateArticle,
        exact: true,
        isShow: false,
        types: "Article"
    }, {
        path: "/admin/createArticle",
        component: createArticle,
        exact: true,
        isShow: true,
        types: "Article",
        title: "书写文章"
    }, {
        path: "/admin/managementArticle",
        component: managementArticle,
        exact: true,
        isShow: true,
        types: "Article",
        title: "文章管理"
    }, {
        path: "/admin/commentHandle",
        component: commentHandle,
        exact: true,
        isShow: true,
        types: "Article",
        title: "评论管理"
    }, {
        path: "/admin/commentHandle/:id",
        component: commentDetail,
        exact: true,
        isShow: false,
        types: "Article",
        title: "评论管理"
    }, {
        path: "/admin/PicStore",
        component: PicStore,
        exact: true,
        isShow: true,
        types: "Article",
        title: "图库"
    }, {
        path: "/admin/InteractAdmin",
        component: InteractAdmin,
        exact: true,
        isShow: true,
        types: "interact",
        title: "留言管理"
    }, {
        path: "/admin/friendLink",
        component: FriendManage,
        exact: true,
        isShow: true,
        types: "FriendLink",
        title: "添加友链"
    },{
        path: "/admin/friendHandle",
        component: FriendHandle,
        exact: true,
        isShow: true,
        types: "FriendLink",
        title: "管理友链"
    },{
        path: "/admin/updateFriend/:id",
        component: UpdataFriend,
        exact: true,
        isShow: false,
        types: "FriendLink",
        title: "友链修改"
    }, {
        path: "/admin/careerOption",
        component: CareerOption,
        exact: true,
        isShow: true,
        types: "careerOption",
        title: "心路历程"
    }
]
// 二级路由
export const blogRoutes = [
    {
        path: "/blog/:id",
        exact: true
    }
]






