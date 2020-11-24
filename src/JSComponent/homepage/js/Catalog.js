import React, { Component } from 'react'
import "../css/catalog.css"
import { List } from 'antd'
import $ from 'jquery'
import { fileIp } from "../../../routes/index"

export default class Catalog extends Component {
    state = {
        ishome: false,
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

    componentWillMount() {
        if (window.location.pathname === "/" || window.location.pathname.split("/")[1] === "tags") {
            this.setState({
                ishome: true
            })
        } else {
            this.setState({
                ishome: false
            })
        }
        $.ajax({
            url: fileIp.defaultIp + "/getArticleList"
        }).then(res => {
            const hotArticle = []
            res.sort((a, b) => b.browseNum - a.browseNum)
            for (var k = 0; k < 5; k++) {
                if (res[k]) {
                    hotArticle[k] = res[k]
                }
            }
            this.setState({
                hotArticle
            })
        })
    }
    componentDidMount() {
        var thediv = (timespan) => {
            var result = Math.floor((new Date() - new Date(timespan)) / 3600000 / 24);
            var result2 = Math.floor((new Date() - new Date(timespan)) / 1000 / 60 / 60 / 60);
            var result3 = Math.floor((new Date() - new Date(timespan)) / 1000 / 60 % 60);
            var result4 = Math.floor((new Date() - new Date(timespan)) / 1000 % 60);
            document.getElementsByClassName("travelTime")[0].innerHTML = result + "天" + result2 + "小时" + result3 + "分钟" + result4 + "秒";
        }
        window.setInterval(function () {
            thediv('2020/3/22')
        }, 0);
        var tagName = window.location.pathname.split("/")[2]
        var newData = []
        console.log(this.state.data)
        newData = this.state.data
        newData.forEach(item => {
            item.isShow = false
        })
        newData.forEach(item => {
            if (item.name == tagName) {
                newData[item.num - 1].isShow = true
            }
        })
        this.setState({
            data: newData
        })
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
        const { data, hotArticle, ishome } = this.state
        return (
            <div id="stopHere" className="catalog">
                <div className="catalogTop">
                    <h3>压力面前保持优雅</h3>
                    <h3 style={{ marginBottom: "0px" }}><span><svg t="1586954364898" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3063" width="16" height="16"><path d="M487.808 200c172.032 0 312 139.968 312 312s-139.968 312-312 312-312-139.968-312-312 139.904-312 312-312m0-104c-229.76 0-416 186.24-416 416 0 229.824 186.24 416 416 416 229.824 0 416-186.176 416-416 0-229.76-186.24-416-416-416m104 572.032c-13.312 0-26.624-5.12-36.8-15.168L451.072 548.8c-9.408-9.28-15.232-22.272-15.232-36.608V304c0-28.8 23.232-52.032 52.032-52.032S539.904 275.2 539.904 304v186.496l88.768 88.704c20.288 20.288 20.288 53.248 0 73.536-10.24 10.176-23.552 15.296-36.864 15.296" p-id="3064" fill="#ffffff"></path></svg></span><span className="travelTime"></span></h3>
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
                <div id="stopHere2" style={ishome ? { display: "none" } : { display: "block" }} className="toolLog">

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