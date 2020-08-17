import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import "../homepage/css/homepage.css";
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { BackTop } from 'antd';
// -------自己引入得组件---------
import NavM from "../homepage/js/nav.js";
import ContentDetail from "./ContentDetail"
import Catalog from "./Catalog"
class BlogFrames extends Component {
    state = {
        conDetail: {},
        md: ""
    }
    componentWillMount() {
        var str = window.location.pathname.split("/")[2]

        var modestAxios = axios.create({
            baseURL: "https://www.modestfun.com:8080"
        })
        modestAxios.get("/browseNumCount?_id=" + str)
            .then(res => {
                modestAxios.get("/getArticle?_id=" + str)
                    .then(res => res.data)
                    .then(res => {
                        var arr = []
                        arr = res[0].date.split(".")
                        res[0].date = arr[0] + "-" + arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4]
                        var mdName = res[0].MdUrl
                        modestAxios.get("/articleMd?name=" + mdName)
                            .then(res => {
                                return res.data
                            }).then(res => {
                                this.setState({
                                    md: res
                                })
                            })
                        this.setState({
                            conDetail: res[0]
                        })
                    }).catch(res => console.log(res))
            })
            .catch(err => console.log(err))

    }
    render() {
        const { conDetail, md } = this.state
        return (
            <div className="appMain">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Blog | ModestFun</title>
                    <link rel="icon" href="https://www.modestfun.com:8080/img/?name=logo" />
                </Helmet>
                <NavM></NavM>
                {/* <a style={{opacity:"0"}} href="#" id='screens3'>&nbsp;</a> */}
                <div className="fixcontainer"></div>
                <div className="container" >
                    <Row className="Row" style={{  marginTop: "75px" }}>
                        <Col xl={17} lg={16} md={23} xs={22} sm={22}>
                            <ContentDetail style={{ width: "100%", height: "100%" }} md={md} v={conDetail}></ContentDetail>
                        </Col>
                        <Col offset={1} xl={6} lg={7} md={0} xs={0} sm={0}>
                            <Catalog></Catalog>
                        </Col>
                    </Row>
                </div>
                <BackTop />
            
            </div>

        )
    }
}
export default withRouter(BlogFrames)