/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import "../common/common.css";
import { Helmet } from 'react-helmet';
import { BackTop } from 'antd';
import AppContent from "./AppContent";
import Catalog from "./Catalog"
import { fileIp } from "../../routes/index"
import api from '../../api';

export default class Home extends Component {
    state = {
        tagName: "",
        articleList: [],
    }
    componentDidMount () {
        const tagName = window.location.pathname.split("/")[2];
        console.log(tagName);
        this.setState({
            tagName
        })
        this.getArticleList(tagName);
    }
    shouldComponentUpdate (nextProps, nextState) {
        return nextState.tagName !== this.state.tagName || nextState.articleList !== this.state.articleList;
    }
    async getArticleList (tagName) {
        try {
            const res = await api.getArticleList(tagName)
            this.setState({ articleList: res.data })
        } catch (e) {
            console.log(e);
        }
    }
    callback (tagName) {
        this.setState({ tagName });
        this.getArticleList(tagName);
    }
    render () {
        const { tagName, articleList } = this.state;
        return (
            <div className="appMain">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>首页 | ModestFun的个人博客</title>
                    <link rel="icon" href={fileIp.defaultIp + "/img/?name=logo"} />
                </Helmet>
                <a href="#" id='screens4'>&nbsp;</a>
                <div className="container" >
                    <Row className="Row" style={{ backgroundColor: "rgba(255,255,255,0)", minHeight: "1000px", marginTop: "40px" }}>
                        <Col style={{ backgroundColor: "rgba(255,255,255,0)" }} xl={17} lg={16} md={23} xs={23} sm={22}>
                            <AppContent
                                tagName={tagName}
                                articleList={articleList}
                            ></AppContent>
                        </Col>
                        <Col style={{ backgroundColor: "rgba(255,255,255,0)" }} offset={1} xl={6} lg={7} md={0} xs={0} sm={0}>
                            <Catalog
                                callback={(tagName) => this.callback(tagName)}
                            ></Catalog>
                        </Col>
                    </Row>
                    <BackTop />
                </div>
            </div>
        )
    }
}

