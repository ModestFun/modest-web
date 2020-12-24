import React, { Component } from 'react'
import { List, Row, Col } from 'antd';
import "antd/dist/antd.css";
import "../css/nav.css";
import logo from '../img/logo.png'
import { Menu, Dropdown, Drawer, Button } from 'antd';
import { Link } from "react-router-dom"

const menu = (
    <Menu>
        <Menu.Item>
            <Link to="/">
                全部文章
        </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tags/studyNotes">
                学习笔记
                </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tags/varia">
                杂文集
                </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tags/techniqueSharing">
                技术分享
                </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tags/otherThings">
                其他
                </Link>
        </Menu.Item>
    </Menu>
);
export default class Nav extends Component {
    state = {
        visible: false,
        placement: 'left',
        pages: [
            {
                name: "文章",
                isShow: false,
                href: "/"
            },
            {
                name: "日记",
                isShow: false,
                href: "/career"
            },
            {
                name: "留言",
                isShow: false,
                href: "/interact"
            },
            {
                name: "友链",
                isShow: false,
                href: "/friendLink"
            },
            {
                name: "关于",
                isShow: false,
                href: "/about"
            },
        ]
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };
    componentDidMount() {
        const pathname = window.location.pathname;
        const pages = this.state.pages
        pages.forEach(item => pathname === item.href ? item.isShow = true : null)
        if (pathname.split('/')[1] === 'blog') {
            pages[0].isShow = true
        }
        this.setState({
            pages
        })
    }
    render() {
        const { pages } = this.state
        return (
            <div className="navm">
                <Row className="container logoModest" style={{ backgroundColor: " background-color: rgba(255, 255, 255,0.6);" }}>
                    <Col xl={0} lg={0} md={0} xs={5} sm={5}>
                        <Button
                            style={{ height: "70px", backgroundColor: "rgba(255,255,255,0)", borderRadius: "none", border: "none" }}
                            onClick={this.showDrawer}>
                            <svg t="1585737403469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1140" width="32" height="32"><path d="M145.3056 231.389867H907.946667c17.339733 0 31.573333-15.086933 31.573333-33.4848 0-18.5344-14.2336-33.621333-31.573333-33.621334H145.3056c-17.6128 0-31.709867 15.086933-31.709867 33.621334 0 18.397867 14.097067 33.4848 31.709867 33.4848zM907.946667 482.884267H145.3056c-17.6128 0-31.709867 14.984533-31.709867 33.518933 0 18.568533 14.097067 33.553067 31.709867 33.553067H907.946667c17.339733 0 31.573333-14.984533 31.573333-33.553067-0.034133-18.5344-14.267733-33.518933-31.573333-33.518933z m0 331.502933H145.3056c-17.6128 0-31.709867 15.018667-31.709867 33.655467 0 18.397867 14.097067 33.416533 31.709867 33.416533H907.946667c17.339733 0 31.573333-15.018667 31.573333-33.416533-0.034133-18.602667-14.267733-33.655467-31.573333-33.655467z" p-id="1141" fill="#ff6700"></path></svg>
                        </Button>
                        <Drawer
                            style={{ marginTop: "70px" }}
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <List
                                size="large"
                                bordered
                                style={{
                                    padding: "none"
                                }}
                            >
                                {
                                    pages.map((v, k) => (
                                        <List.Item key={k} className="smItemA"><Link to={v.href}>{v.name}</Link></List.Item>
                                    ))
                                }
                            </List>
                        </Drawer>
                    </Col>
                    <Col className="smLogo" style={{ boxSizing: "border-box", backgroundColor: " background-color: rgba(255, 255, 255,0.6);", height: "50px" }} xl={5} lg={5} md={5} xs={14} sm={14}>
                        <div onClick={() => { window.location.href = "/admin" }} className="navname">
                            <img className="navlogo" src={logo} />
                            <h3 className="navMF">ModestFun</h3>
                        </div>
                    </Col>
                    <Col xl={0} lg={0} md={0} xs={5} sm={5}>
                        <Dropdown overlay={menu} placement="topRight">
                            <Button style={{ height: "70px", backgroundColor: "rgba(255,255,255,0)", borderRadius: "none", border: "none", float: "right" }}><svg t="1585737503747" viewBox="0 0 1434 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4887" width="32" height="32"><path d="M788.111359 588.177954c-20.070139 15.3598-47.205786 29.900411-73.112649 25.39487-25.804465 3.276757-50.175348-12.28784-70.143088-25.39487l-620.740731-481.273744c-31.743587-24.575681-31.743587-64.203965 0-88.574848a99.019513 99.019513 0 0 1 114.686509 0l577.528492 457.926847L1295.496763 18.329362a99.019513 99.019513 0 0 1 114.686509 0c31.743587 24.370883 31.743587 64.101567 0 88.47245l-622.071913 481.273743z" p-id="4888" fill="#ff6700"></path><path d="M788.111359 997.772629c-20.070139 15.3598-47.205786 29.900411-73.112649 25.39487-25.804465 3.276757-50.175348-12.28784-70.143088-25.39487l-620.740731-481.273743c-31.743587-24.575681-31.743587-64.203965 0-88.574849a99.019513 99.019513 0 0 1 114.686509 0l577.528492 457.926847 579.166871-457.926847a99.019513 99.019513 0 0 1 114.686509 0c31.743587 24.370883 31.743587 64.101567 0 88.47245l-622.071913 481.273743z" p-id="4889" fill="#ff6700"></path></svg></Button>
                        </Dropdown>
                    </Col>
                    <Col style={{ boxSizing: "border-box", height: "80px" }} offset={4} xl={15} lg={15} md={15} xs={0} sm={0}>
                        <ul className="navlist">
                            {
                                pages.map((v, k) => (
                                    <li className={v.isShow ? "navitem navitem_show" : "navitem"}>
                                        <Link to={v.href}>{v.name}</Link>
                                        <span className={v.isShow ? "line line_show" : "line"}></span>
                                    </li>
                                ))
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }

}