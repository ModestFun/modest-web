import React, { Component } from 'react';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import "./css/homepage.css";
import { Helmet } from 'react-helmet';
import { BackTop } from 'antd';
// -------自己引入得组件---------
import NavM from "./js/nav.js";
import AppContent from "./js/appcontent";
import Catalog from "./js/Catalog"
import AppContentAll from "./js/AppContentAll"
export default class HomePage extends Component {
    state = {
        tagName: ""
    }
    componentWillUnmount() {
        window.location.reload(true)

    }
    componentDidMount() {
        var aa = window.location.pathname.split("/")[2]
        if (aa == undefined) {
            aa = "all"
        }
        this.setState({
            tagName: aa
        })

    }
    render() {
        const { tagName } = this.state
        return (
            <div className="appMain">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>首页 | Modest的个人博客</title>
                    <link rel="icon" href="https://modestfun.com:8080/img/?name=logo" />
                </Helmet>
                <div className="fixcontainer"></div>
                <NavM></NavM>
                <a href="#" id='screens4'>&nbsp;</a>
                <div className="container" >
                    <Row className="Row" style={{ backgroundColor: "rgba(255,255,255,0)", minHeight: "1000px", marginTop: "50px" }}>

                        <Col style={{ backgroundColor: "rgba(255,255,255,0)" }} xl={17} lg={16} md={23} xs={23} sm={22}>
                            {
                                tagName == "all" ? <AppContentAll></AppContentAll> : <AppContent tagName={tagName}></AppContent>
                            }
                        </Col>
                        <Col style={{ backgroundColor: "rgba(255,255,255,0)" }} offset={1} xl={6} lg={7} md={0} xs={0} sm={0}>
                            <Catalog></Catalog>
                        </Col>
                    </Row>
                    <BackTop />
                </div>
            </div>
        )
    }
}

