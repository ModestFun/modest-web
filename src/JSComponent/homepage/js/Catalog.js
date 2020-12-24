import React, { Component } from 'react'
import "../css/catalog.css"
import { List } from 'antd'
import $ from 'jquery'
import { fileIp } from "../../../routes/index"

export default class Catalog extends Component {
    state = {
        isHome: false,
        data: [
            {
                num: 1,
                tagName: "全部文章",
                isShow: true
            },
            {
                num: 2,
                name: "studyNotes",
                tagName: "学习笔记",
                isShow: false
            },
            {
                num: 3,
                name: "varia",
                tagName: "杂文集",
                isShow: false
            },
            {
                num: 4,
                name: "techniqueSharing",
                tagName: "技术分享",
                isShow: false
            },
            {
                num: 5,
                name: "otherThings",
                tagName: "其他",
                isShow: false
            }
        ],
        hotArticle: []
    }
    componentDidMount() {
        this.setState({
            isHome: window.location.pathname === "/" || window.location.pathname.split("/")[1] === "tags"
        })
        var tagName = window.location.pathname.split("/")[2]
        const data = this.state.data
        data.forEach(i => i.isShow = false);
        data.forEach(item => item.name == tagName ? data[item.num - 1].isShow = true : null);
        this.setState({ data });
        this.catalogInit()
    }
    catalogInit() {
        const travelTime = (timeStamp) => {
            var result = parseInt((Date.now() - timeStamp) / 3600000 / 24);
            var result2 = Math.floor((Date.now() - timeStamp) % (24 * 3600000) / 3600 / 1000);
            var result3 = Math.floor((Date.now() - timeStamp) / 1000 / 60 % 60);
            document.getElementsByClassName("travelTime")[0].innerHTML = result + "天" + result2 + "小时" + result3 + "分钟";
        }
        this.timeInterval = setInterval(function () {
            travelTime(Date.parse('2020/3/22'))
        }, 0);
        window.onload = function () {
            var stopHere = document.getElementById("stopHere"),
                H = 0,
                Y = stopHere;
            while (Y) {
                H += Y.offsetTop;
                Y = Y.offsetParent;
            }
            window.onscroll = function () {
                var s = document.body.scrollTop || document.documentElement.scrollTop
                if (s > (H)) {
                    stopHere.className = "stopHereNow";
                } else {
                    stopHere.className = "catalog";
                }
            }
        }
    }
    componentWillUnmount() {
        window.clearInterval(this.timeInterval);
    }
    tagClick = (k) => {
        var newData = []
        newData = this.state.data
        newData.forEach(item => {
            item.isShow = false
        })
        newData[k].isShow = true
        this.setState({
            data: newData
        })
        if (newData[k].tagName == "全部文章") {
            window.location.href = "/"
        } else {
            window.location.href = "/tags/" + newData[k].name
        }
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView(
                    { behavior: 'smooth' }
                );
            }
        }
    }
    render() {
        const { data, hotArticle, isHome } = this.state
        return (
            <div id="stopHere" className="catalog">
                <div className="catalogTop">
                    <h3>搜索框</h3>
                    <h3 style={{ marginBottom: "0px" }}>
                        本站已运行：
                        <span className="travelTime"></span>
                    </h3>
                </div>
                <List
                    className="tagsLog"
                    bordered
                    size="large">
                    {
                        data.map((v, k) => (
                            <List.Item key={v.num} onClick={(key) => { this.tagClick(k) }} className={v.isShow ? "tagsItem tagsItem_show" : "tagsItem"}>
                                {v.tagName}
                                <div className={v.isShow ? "tagsLine tagsLine_show" : "tagsLine"}></div>
                            </List.Item>
                        ))
                    }
                </List>
                <div className="hotLog">
                    <h2 style={{ textAlign: "center", color: "#ff6700", fontWeight: "600" }}>热门文章</h2>
                    {
                        hotArticle.map((v, k) => (
                            <div className="hotItemA" key={k}>
                                <span className={k + 1 === 1 ? "spanNum spanNum1" : k + 1 === 2 ? "spanNum spanNum2" : k + 1 === 3 ? "spanNum spanNum3" : "spanNum"}>{k + 1}</span>
                                <a className={k + 1 === 1 ? "hotA hotA1" : k + 1 === 2 ? "hotA hotA2" : k + 1 === 3 ? "hotA hotA3" : "hotA"} href={"/blog/" + v._id}> {v.headTitle}</a>
                            </div>
                        ))
                    }
                </div>
                <div id="stopHere2" style={isHome ? { display: "none" } : { display: "block" }} className="toolLog">

                    <h2 style={{ textAlign: "center", color: "#ff6700", fontWeight: "600" }}>工具栏</h2>
                    <div className="toolItemA">
                        <a className="toolA" onClick={() => { this.scrollToAnchor('screens1') }}>去到留言</a>
                    </div>
                    <div className="toolItemA">
                        <a className="toolA" onClick={() => { this.scrollToAnchor('screens2') }}>去发表看法</a>
                    </div>
                </div>
            </div >
        )
    }
}