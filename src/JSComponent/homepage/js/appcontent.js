import React, { Component } from 'react'
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import "../css/appcontent.css";
import axios from 'axios'
import $ from "jquery"

import LazyLoad from 'react-lazyload';
class Sectioon extends Component {

    render() {
        var { v } = this.props
        var date = v.date.split(".")
        var imgUrl = "https://modestfun.com:8080/articleImg/?name=" + v.titleImg
        var aHref = "/blog/" + v._id
        return (

            <LazyLoad height={200}>
                <div className="sectionitem" id={v._id}>
                    <div className="top">
                        <div className="topTitle">
                            <a href={aHref}>
                                <span>【{v.contentType}】</span>
                                {v.headTitle}
                            </a>
                        </div>
                        <div className="date">
                            <span className="rr">{date[2]}</span>
                            <div className="div">
                                <span className="nn">{date[0]} - {date[1]}月</span>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <Row className="Row">
                            <Col xl={9} lg={9} md={9} sm={9} xs={24}>
                                <div className="titleImg">
                                    <a href={aHref}>
                                        <img src={imgUrl} alt="" />
                                    </a>
                                </div>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <h4 style={{ color: "#ff6700" }}>文章简介：</h4>
                                <p dangerouslySetInnerHTML={{ __html: v.titleText }} className="text"></p>
                            </Col>
                        </Row>
                    </div>
                    <div className="bottom">
                        <Row className="Row" justify={"space-between"}>
                            <Col xl={5} lg={5} md={5} sm={7} xs={7}>
                                <div className="left">
                                    <a href={aHref}>>>阅读全文</a>
                                    <svg t="1585306184285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1193" width="16" height="16"><path d="M931.479305 1023.72653a44.607686 44.607686 0 0 1-26.473404-8.47149L511.611119 730.930682 118.216336 1015.122673a44.740053 44.740053 0 0 1-46.857924 4.103378A45.137154 45.137154 0 0 1 47.135247 979.515945V45.004787A45.004787 45.004787 0 0 1 92.140034 0h839.471638a45.004787 45.004787 0 0 1 45.004787 45.004787v933.716956a45.269521 45.269521 0 0 1-45.137154 45.004787z" fill="#ff6700" p-id="1194"></path><path d="M277.850962 223.83263a38.783537 38.783537 0 0 0 38.783537 38.65117h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.783537zM277.850962 472.55026a38.783537 38.783537 0 0 0 38.783537 38.783537h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.65117z" fill="#ff6700" p-id="1195"></path></svg>
                                    <span className="contentTag"> {v.contentTag}</span>
                                </div>
                            </Col>
                            <Col xl={17} lg={17} md={17} sm={15} xs={15}>
                                <div className="right">
                                    <span>
                                        <svg t="1585313082161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2077" width="16" height="16"><path d="M716.518 392.185c-28.037 0-50.743 24.206-50.743 54.131 0 29.878 22.706 54.076 50.743 54.076 28.035 0 50.69-24.198 50.69-54.076 0.051-29.924-22.655-54.131-50.69-54.131zM513.602 392.185c-28.009 0-50.688 24.206-50.688 54.131 0 29.878 22.711 54.076 50.688 54.076 27.977 0 50.686-24.198 50.686-54.076 0-29.924-22.65-54.131-50.686-54.131z" p-id="2078" fill="#ff6700"></path><path d="M817.95 93.893H209.256c-70.911 0-145.378 36.701-145.378 149.387v388.393c0 77.342 37.231 164.357 147.643 146.566h142.984c36.225 39.165 130.679 139.679 130.679 139.679 7.408 7.934 17.737 12.517 28.413 12.517 10.649 0 21.005-4.583 29.198-13.437 0.812-0.837 73.86-86.027 125.656-138.784h147.147c94.443 8.808 144.524-69.206 144.524-146.541V213.396c0.029-74.993-39.733-124.353-142.172-119.503z m82.422 149.388v388.393c0 46.304-43.817 90.735-84.688 90.735H646.56l-7.922 7.855c-42.552 42.497-102.812 108.363-126.305 135.403-28.71-30.495-104.78-110.635-126.49-134.469l-8.002-8.736H211.526c-52.679 0-87.897-44.485-87.897-90.789V243.281c0-44.182 44.592-93.606 85.628-93.606h608.745c43.464-4.853 89.648 27.509 82.37 93.606z" p-id="2079" fill="#ff6700"></path><path d="M310.687 392.185c-28.005 0-50.688 24.206-50.688 54.131 0 29.878 22.739 54.076 50.688 54.076 27.984 0 50.718-24.198 50.718-54.076 0-29.924-22.683-54.131-50.718-54.131z" p-id="2080" fill="#ff6700"></path></svg>
                                        {v.remark}
                                    </span>

                                    <span>
                                        <svg t="1585306219442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="822" width="16" height="16"><path d="M398.934898 897.042493c0 0-113.547079-101.719706 41.290405-319.997058 0 0 34.408671 33.619702 41.290405 63.260789 0 0 68.816319-52.9387 55.05285-190.571337 0 0 233.976916 158.27784 120.428813 447.307605 0 0 354.405729-101.719706 65.375963-543.650861 0 0-6.881734 61.934584-27.526937 82.579787 0 0-20.645203-206.449979-306.23359-309.674968 0 0 107.812471 212.184587-61.934584 368.169197 0 0-19.498076-47.025013-47.025013-88.314395 0 0-8.606005 98.797144-69.971631 151.921062C171.864276 590.808904 128.257106 855.753111 398.934898 897.042493z" p-id="823" fill="#ff6700"></path></svg>
                                        {v.browseNum}
                                    </span>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </LazyLoad>
        )
    }
}

export default class AppContent extends Component {
    state = {
        contentList: []
    }
    componentWillMount() {
        var modestAxios = axios.create({
            baseURL: "https://modestfun.com:8080"
        })
        modestAxios.get("/getArticleList")
            .then(res => {
                return res.data
            }).then(res => {
                res.forEach(item => {
                    var str = item.titleText
                    for (var j = 0; j < str.length; j++) {
                        str = str.replace("&lt;br&gt;", "<br>")
                        str = str.replace("\n", "<br>")
                        str = str.replace("\r", "")
                    }
                    str = str.replace("<br>", "")
                    item.titleText = str
                })
                this.setState({
                    contentList: res
                })
            }
            ).catch(err => {
                console.log(err)
            })
    }
    tagHandle = (tagName) => {
        if (tagName == "personalDiary") {
            return "个人日记"
        }
        else if (tagName == "studyNotes") {
            return "学习笔记"
        }
        else if (tagName == "LifetimesLove") {
            return "王老师和米米"
        }
        else if (tagName == "varia") {
            return "杂文集"
        }
        else if (tagName == "techniqueSharing") {
            return "技术分享"
        }
        else if (tagName == "otherThings") {
            return "其他"
        }
    }
    componentDidMount() {
        $(".waifu")[0].style.display = "none"
    }
    render() {
        const { contentList } = this.state
        const { tagName } = this.props
        var contentTag = this.tagHandle(tagName)
        return (

            <div className="appcontent">
                {
                    contentList.map((v, k) => (
                        v.contentTag == contentTag ?
                            <Sectioon v={v} key={k}></Sectioon> : ""
                    ))
                }
                <div className="appfooter">
                    已经到底啦！如果你有什么好的想法，欢迎<a href="http://www.modestfun.com/interact">留言</a>告诉博主！
                </div>
            </div>

        )
    }

}