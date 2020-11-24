import React, { Component } from 'react'
import $ from 'jquery'
import { fileIp } from "../../routes/index"
export default class Catalog extends Component {
    state = {
        ishome: false,
        hotArticle: [],
        markdown: "",
        navData: []
    }

    componentWillMount() {
        if (window.location.pathname == "/" || window.location.pathname.split("/")[1] == "tags") {
            this.setState({
                ishome: true
            })
        } else {
            this.setState({
                ishome: false
            })
        }
        const hotArticle = Array(5)
        $.ajax({
            url: fileIp.defaultIp +"/getArticleList"
        }).then(res => {
            for (var i = 0; i < res.length; i++) {
                for (var j = i; j < res.length; j++) {
                    if (res[i].browseNum < res[j].browseNum) {
                        var max = res[j]
                        res[j] = res[i]
                        res[i] = max
                    }
                }
            }
            var yuliu = {
                headTitle: "这里还是空的"
            }
            for (var k = 0; k < 5; k++) {
                if (res[k] == undefined) {
                    res[k] = yuliu
                }
                hotArticle[k] = res[k]
            }
            this.setState({
                hotArticle: hotArticle
            })
            var id = window.location.pathname.split("/")[2]
            $.ajax({
                url: fileIp.defaultIp +"/getArticle?_id=" + id
            }).then(res => {
                $.ajax({
                    url: fileIp.defaultIp +"/articleMd?name=" + res[0].MdUrl
                }).then(res2 => {
                    this.setState({
                        markdown: res2
                    })
                })
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
        window.setTimeout(() => {
            this.getMD()
        }, 500)
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
    getMD = () => {
        var nav = new Array()
        for (var i = 0; i < $("[type=h1]").length; i++) {
            var obj = new Object()
            obj.title = $(".MDtitle")[i].innerHTML
            obj.href = $(".MDlink")[i].href
            nav.push(obj)
        }
        this.setState({
            navData: nav
        })
    }
    render() {
        const { hotArticle, ishome, markdown, navData } = this.state
        return (
            <div id="stopHere" className="catalog">
                <div className="catalogTop">
                    <h3>From nobody to somebody</h3>
                    <h3 style={{ marginBottom: "0px" }}><span><svg t="1586954364898" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3063" width="16" height="16"><path d="M487.808 200c172.032 0 312 139.968 312 312s-139.968 312-312 312-312-139.968-312-312 139.904-312 312-312m0-104c-229.76 0-416 186.24-416 416 0 229.824 186.24 416 416 416 229.824 0 416-186.176 416-416 0-229.76-186.24-416-416-416m104 572.032c-13.312 0-26.624-5.12-36.8-15.168L451.072 548.8c-9.408-9.28-15.232-22.272-15.232-36.608V304c0-28.8 23.232-52.032 52.032-52.032S539.904 275.2 539.904 304v186.496l88.768 88.704c20.288 20.288 20.288 53.248 0 73.536-10.24 10.176-23.552 15.296-36.864 15.296" p-id="3064" fill="#ffffff"></path></svg></span><span className="travelTime"></span></h3>
                </div>
                <div className="markdownLog">
                    <ul className="innerbox">
                        {
                            navData.map((v,k)=>(
                                <li>
                                    <a className="mdlink" href={v.href}>{v.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="hotLog">
                    <h2 style={{ textAlign: "center", color: "#ff6700", fontWeight: "600" }}>热门文章</h2>
                    {
                        hotArticle.map((v, k) => (
                            <div className="hotItemA" key={k}>
                                <span className={k + 1 == 1 ? "spanNum spanNum1" : k + 1 == 2 ? "spanNum spanNum2" : k + 1 == 3 ? "spanNum spanNum3" : "spanNum"}>{k + 1}</span>
                                <a className={k + 1 == 1 ? "hotA hotA1" : k + 1 == 2 ? "hotA hotA2" : k + 1 == 3 ? "hotA hotA3" : "hotA"} href={"/blog/" + v._id}> {v.headTitle}</a>
                            </div>
                        ))
                    }
                </div>
                {
                    ishome ? "" : <div id="stopHere2" className="toolLog">

                        <h2 style={{ textAlign: "center", color: "#ff6700", fontWeight: "600" }}>工具栏</h2>
                        <div className="toolItemA">
                            <a className="toolA" onClick={() => { this.scrollToAnchor('screens1') }}>去到留言</a>
                        </div>
                        <div className="toolItemA">
                            <a className="toolA" onClick={() => { this.scrollToAnchor('screens2') }}>去发表看法</a>
                        </div>
                    </div>
                }
            </div >
        )
    }
}