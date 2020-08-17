import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
// 在组件中使用路由 withRouter
import { withRouter } from 'react-router-dom'
import logo from '../img/logo.png'
import 'antd/dist/antd.css';
import '../css/admin.css'
import { adminRoutes } from '../../../routes/index'



const routes = adminRoutes.filter(route => {
    return route.isShow == true && route.types == "Article"
}
)
const routes2 = adminRoutes.filter(route => {
    return route.isShow == true && route.types == "interact"
}
)
const routes3 = adminRoutes.filter(route => {
    return route.isShow == true && route.types == "FriendLink"
}
)
const routes4 = adminRoutes.filter(route => {
    return route.isShow == true && route.types == "careerOption"
}
)
const { SubMenu } = Menu;
const { Footer, Content, Sider } = Layout;

function onFinish() {
    console.log('finished!');
}
class Frame extends React.Component {
    componentWillMount() {
        var password = "password=528528+++"
        if (document.cookie != password) {
            document.body.innerHTML = ""
            window.location.href = "/login"
        }
    }
    render() {
        var begin = new Date('2020/03/26 12:00:00').getTime();
        var date = Date.now() - begin
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider style={{ position: "fixed", width: "100%", height: "100vh" }}>
                    <div style={{ width: "100%", height: "50px" }} className="logo">
                        <div onClick={() => { window.location.href = "/" }} className="logoTitle">
                            <img style={{ borderRadius: "50%", backgroundColor: "white", width: "25px", height: "25px", marginTop: "3px" }} src={logo} alt="" />
                            <h3>ModestFun</h3>
                        </div>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <span>博客管理</span>
                                </span>
                            }
                        >
                            {
                                routes.map(route => {
                                    return (
                                        <Menu.Item
                                            key={route.path}
                                            onClick={
                                                p => this.props.history.push(p.key)
                                            }
                                        >
                                            {route.title}</Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <span>留言管理</span>
                                </span>
                            }
                        >
                            {
                                routes2.map(route => {
                                    return (
                                        <Menu.Item
                                            key={route.path}
                                            onClick={
                                                p => this.props.history.push(p.key)
                                            }
                                        >
                                            {route.title}</Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <span>友链管理</span>
                                </span>
                            }
                        >
                            {
                                routes3.map(route => {
                                    return (
                                        <Menu.Item
                                            key={route.path}
                                            onClick={
                                                p => this.props.history.push(p.key)
                                            }
                                        >
                                            {route.title}</Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <span>历程管理</span>
                                </span>
                            }
                        >
                            {
                                routes4.map(route => {
                                    return (
                                        <Menu.Item
                                            key={route.path}
                                            onClick={
                                                p => this.props.history.push(p.key)
                                            }
                                        >
                                            {route.title}</Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>
                        <div className="yuliu container">

                        </div>
                        <div className="site-layout-background" style={{ marginLeft: "200px", padding: 24, minHeight: 740 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ marginLeft: "200px", textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }

}


export default withRouter(Frame)


