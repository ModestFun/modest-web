import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import NavM from "../homepage/js/nav";
import { Button, Menu, Dropdown, message } from 'antd';
import "./interact.css"
import $ from "jquery"
import { BackTop } from 'antd';
const success = () => {
    message.success('留言发表成功！');
};
const nameError = () => {
    message.error('行不更名，做不改姓，留个名字！');
};
const contentError = () => {
    message.error('内容不能为空！');
};
const replyError = () => {
    message.error('您还没有点击过任何回复！');
};
const emailWarning = () => {
    message.warning('检测到您输入的不是QQ邮箱，建议更换成QQ邮箱！');
};
const emailError = () => {
    message.error('您的邮箱输入有问题！');
};
$(document).ready(function () {
    var a_index = 0;
    $("body").click(function (e) {
        var a = new Array("intelligent", "bright", "clever", "beauty", "pulchritude", "goodliness", "handsome", "wonderful", "brilliant", "colourful", "splendid", "perfect");
        var $i = $("<span/>").text(a[a_index]);
        a_index = (a_index + 1) % a.length;
        var x = e.pageX, y = e.pageY;
        $i.css({
            "z-index": 99999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6700"
        });
        $("body").append($i);
        $i.animate({ "top": y - 180, "opacity": 0 }, 1500, function () {
            $i.remove();
        });
    });
});
export default class Interact extends Component {

    state = {
        emoji: [],
        isshow: false
    }
    componentWillMount() {
        $.ajax({
            url: "https://www.modestfun.com:8080/getEmoji"
        }).then(res => {
            var emoji = []
            for (var i = 0; i < res.length - 3; i++) {
                emoji.push(res[i])
            }
            this.setState({
                emoji: emoji
            })
        })
    }
    componentDidMount() {
        $.ajax({
            url: "https://www.modestfun.com:8080/getFaWords"
        }).then(res => {
            res.forEach(item => {
                var isBZ = false
                if (item.username == "ModestFun528528+++") {
                    item.username = "博主"
                    isBZ = true
                }
                if (item.headImg[0] == "h") {
                    item.headImg = `<img src="` + item.headImg + `">`
                }
                item.facontent = this.formatContent(item.facontent)
                var divItem = document.createElement("div")
                divItem.className = "commentItem"
                divItem.id = item._id
                divItem.innerHTML = `
                        <div class="commentHeadImg">
                            <h3>`+ item.headImg + (isBZ ? ` <span class="modestfun">` + item.username + `</span> ` : item.username) + `</h3>
                        </div>
                        <div class="commentContent">
                            <p class="facontent">`+ item.facontent + `</p>
                            <p class="operate">`+ item.viewTime + ` <span class="faReply" id="` + item._id + "_" + item.username + `"> 回复</span></p>
                        </div>
                `
                $(".commentCard")[0].appendChild(divItem)
            })
            this.faReplyClick()

            $.ajax({
                url: "https://modestfun.com:8080/getsonWords"
            }).then(res2 => {
                res2.forEach(item => {
                    item.sonContent = this.formatContent(item.sonContent)
                    for (var i = 0; i < res.length; i++) {
                        if (item.faid == res[i]._id) {
                            if (item.sonName == "ModestFun528528+++") {
                                item.sonName = "博主"
                                var son = document.createElement("div")
                                son.className = "sonDiv"
                                son.innerHTML = `
                                <hr />
                                <h3 style="margin:0px;" > <img class="replyImg" src="http://q4.qlogo.cn/g?b=qq&nk=2770977202@qq.com&s=3" /> <span class="modestfun">` + item.sonName + "</span> 回复 " + item.faName + " 说:" + `</h3>
                                <div class="commentContent">
                                    <p class="facontent">`+ item.sonContent + `</p>
                                    <p class="operate">`+ item.viewTime + ` <span class="sonReply" id="` + item._id + "_" + item.sonName + `"> 回复</span></p>
                                </div>
                            `
                            } else {
                                var son = document.createElement("div")
                                son.className = "sonDiv"
                                var src = ""
                                if (item.headImg[0][0] == "h") {
                                    src = item.headImg
                                }
                                if (item.headImg.length == 13) {
                                    src = "https://modestfun.com:8080/getPicStoreItem?name=" + item.headImg
                                }
                                son.innerHTML = `
                                <hr />
                                <h3 style="margin:0px;" > <img class="replyImg" src=`+ src + ` /> ` + item.sonName + " 回复 " + item.faName + " 说:" + `</h3>
                                <div class="commentContent">
                                    <p class="facontent">`+ item.sonContent + `</p>
                                    <p class="operate">`+ item.viewTime + ` <span class="sonReply" id="` + item._id + "_" + item.sonName + `"> 回复</span></p>
                                </div>
                            `
                            }
                            document.getElementById(item.faid).appendChild(son)
                        }
                    }
                })
                this.sonReplyClick()
            })
        })

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
    sonReplyClick = () => {
        var list = this.state.emoji
        $(".sonReply").on("click", function () {
            var anchorName = "screensTop"
            if (anchorName) {
                let anchorElement = document.getElementById(anchorName);
                if (anchorElement) {
                    anchorElement.scrollIntoView(
                        { behavior: 'smooth' }
                    );
                }
            }
            var sonid = this.id.split("_")[0]
            var sonName = this.id.split("_")[1]
            if ($(".reply")[0].innerHTML != "") {
                $(".reply")[0].innerHTML = ""
            }
            $.ajax({
                url: "https://modestfun.com:8080/getTheSonWords?_id=" + sonid
            }).then(sonResult => {
                if (sonResult[0].email == "") {
                    sonResult[0].email = ""
                }
                $(".reply")[0].id = sonResult[0].faid + "_son_" + sonName + "_" + sonResult[0]._id
                // content格式处理
                var str = sonResult[0].sonContent
                for (var j = 0; j < str.length; j++) {
                    str = str.replace("&lt;br&gt;", "<br>")
                    str = str.replace("\n", "<br>")
                    str = str.replace("\r", "")
                }
                for (var i = 0; i < str.length / 4; i++) {
                    list.forEach(items => {
                        if (str.search(items.name)) {
                            var cc = "[" + items.name + ']'
                            str = str.replace(cc, `<img class="emoji" src="https://modestfun.com:8080/getTheEmoji?name=` + items.src + `" alt=""/>`)
                        }
                    })
                }
                sonResult[0].sonContent = str
                if (sonResult[0].sonName == "ModestFun528528+++") {
                    sonResult[0].sonName = "博主"
                }
                var div = document.createElement("div")
                div.innerHTML = `
                    <h3>您要回复的是: `+ sonResult[0].sonName + `</h3>
                    <p>Ta说：<hr /> `+ sonResult[0].sonContent + `</p>
                `
                $(".reply")[0].appendChild(div)
            })
        })
    }

    faReplyClick = () => {
        var list = this.state.emoji
        $(".faReply").on("click", function () {
            var anchorName = "screensTop"
            if (anchorName) {
                let anchorElement = document.getElementById(anchorName);
                if (anchorElement) {
                    anchorElement.scrollIntoView(
                        { behavior: 'smooth' }
                    );
                }
            }
            var faid = this.id.split("_")[0]
            var faName = this.id.split("_")[1]
            $(".reply")[0].id = faid + "_fa_" + faName
            if ($(".reply")[0].innerHTML != "") {
                $(".reply")[0].innerHTML = ""
            }
            $.ajax({
                url: "https://modestfun.com:8080/getTheFaWords?_id=" + faid
            }).then(faResult => {

                // content格式处理
                var str = faResult[0].facontent
                for (var j = 0; j < str.length; j++) {
                    str = str.replace("&lt;br&gt;", "<br>")
                    str = str.replace("\n", "<br>")
                    str = str.replace("\r", "")
                }
                for (var i = 0; i < str.length / 4; i++) {
                    list.forEach(items => {
                        if (str.search(items.name)) {
                            var cc = "[" + items.name + ']'
                            str = str.replace(cc, `<img class="emoji" src="https://modestfun.com:8080/getTheEmoji?name=` + items.src + `" alt=""/>`)
                        }
                    })
                }
                faResult[0].facontent = str
                var div = document.createElement("div")
                if (faResult[0].username == "ModestFun528528+++") {
                    faResult[0].username = "博主"
                }
                div.innerHTML = `
                    <h3>您要回复的是: `+ faResult[0].username + `</h3>
                    <p>Ta说：<hr /> `+ faResult[0].facontent + `</p>
                `
                $(".reply")[0].appendChild(div)
            })
        })
    }

    formatContent(defaultContent) {
        var str = defaultContent
        for (var j = 0; j < str.length; j++) {
            str = str.replace("&lt;br&gt;", "<br>")
            str = str.replace("\n", "<br>")
            str = str.replace("\r", "")
        }
        defaultContent = str
        var aa = defaultContent
        var list = this.state.emoji
        for (var i = 0; i < aa.length / 4; i++) {
            list.forEach(items => {
                if (aa.search(items.name)) {
                    var cc = "[" + items.name + ']'
                    aa = aa.replace(cc, `<img class="emoji" src="https://modestfun.com:8080/getTheEmoji?name=` + items.src + `" alt=""/>`)
                }
            })
        }
        return aa
    }

    emojiList = (ev) => {
        var aa = !this.state.isshow
        this.setState({
            isshow: aa
        })

    }
    emojiClick = (e) => {
        this.setState({
            isshow: false
        })
        $("#textarea")[0].value += `[` + e.alt + `]`
    }
    sendEmailToFa = (faid, sonContent) => {
        $.ajax({
            url: "https://modestfun.com:8080/getTheFaWords?_id=" + faid
        }).then(res => {
            if (res[0].email != "") {
                $.ajax({
                    url: "https://modestfun.com:8080/sendEmail?name=" + res[0].username + "&&con=" + sonContent + "&&email=" + res[0].email
                }).then(res => {
                    console.log("success")
                })
            }
        })
    }
    sendEmailToSon = (sonId, sonContent) => {
        $.ajax({
            url: "https://www.modestfun.com:8080/getTheSonWords?_id=" + sonId
        }).then(res => {
            console.log(res)
            if (res[0].email != "") {
                $.ajax({
                    url: "https://www.modestfun.com:8080/sendEmail?name=" + res[0].sonName + "&&con=" + sonContent + "&&email=" + res[0].email
                }).then(res => {
                    console.log("success")
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    }
    subWords = () => {
        var email = this.email.value
        if (email.indexOf("@") == -1) {
            emailError()
        } else if (email.split("@")[1] != "qq.com") {
            emailError()
        }
        else if ($(".reply")[0].innerHTML == "") {
            var username = $(".username")[0].value
            var facontent = $("#textarea")[0].value
            var viewTime = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 ' + new Date().getHours() + ':' + new Date().getMinutes()
            var viewCount = 0
            var province = ""
            var browser = ""
            var windows = ""
            var IP = ""
            var headImg = this.headImg.src
            if (username == "") {
                nameError()
            } else if (email == "" || email.indexOf("@") == -1) {
                emailError()
            } else if (facontent == "") {
                contentError()
            } else {
                var formdata = new FormData()
                formdata.append("username", username)
                formdata.append("facontent", facontent)
                formdata.append("viewTime", viewTime)
                formdata.append("viewCount", viewCount)
                formdata.append("email", email)
                formdata.append("province", province)
                formdata.append("browser", browser)
                formdata.append("windows", windows)
                formdata.append("IP", IP)
                formdata.append("headImg", headImg)
                $.ajax({
                    url: "https://modestfun.com:8080/addFaWords",
                    data: formdata,
                    type: 'POST',
                    processData: false,//必须
                    contentType: false,//必须
                    success: function () {
                        success()
                    }
                })
                window.setTimeout(function () {
                    window.location.reload(true)
                }, 300)
            }
        } else {
            // 回复  -  添加子评论
            var type = $(".reply")[0].id.split("_")[1]
            if (type == "fa") {
                var faid = $(".reply")[0].id.split("_")[0]
                var faName = $(".reply")[0].id.split("_")[2]
                var sonName = $(".username")[0].value
                var sonContent = $("#textarea")[0].value
                var viewTime = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 ' + new Date().getHours() + ':' + new Date().getMinutes()
                var viewCount = 0
                var province = ""
                var browser = ""
                var windows = ""
                var IP = ""
                var headImg = this.headImg.src
                var isBZ = false
                if (sonName == "ModestFun528528+++") {
                    isBZ = true
                }
                if (sonName == "") {
                    nameError()
                } else if (sonContent == "") {
                    contentError()
                } else {
                    var formdata = new FormData()
                    formdata.append("faid", faid)
                    formdata.append("faName", faName)
                    formdata.append("sonName", sonName)
                    formdata.append("sonContent", sonContent)
                    formdata.append("viewTime", viewTime)
                    formdata.append("viewCount", viewCount)
                    formdata.append("email", email)
                    formdata.append("province", province)
                    formdata.append("browser", browser)
                    formdata.append("windows", windows)
                    formdata.append("IP", IP)
                    formdata.append("headImg", headImg)
                    $.ajax({
                        url: "https://modestfun.com:8080/addSonWords",
                        data: formdata,
                        type: 'POST',
                        processData: false,//必须
                        contentType: false,//必须
                        success: function () {
                            success()
                        }
                    })
                    window.setTimeout(() => {
                        if (isBZ) {
                            this.sendEmailToFa(faid, sonContent)
                        }
                        window.location.reload(true)
                    }, 300)
                }
            } else if (type == 'son') {
                var faid = $(".reply")[0].id.split("_")[0]
                var faName = $(".reply")[0].id.split("_")[2]
                var sonId = $(".reply")[0].id.split("_")[3]
                var sonName = $(".username")[0].value
                var sonContent = $("#textarea")[0].value
                var viewTime = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 ' + new Date().getHours() + ':' + new Date().getMinutes()
                var province = ""
                var browser = ""
                var windows = ""
                var IP = ""
                var headImg = this.headImg.src
                var isBZ = false
                if (sonName == "ModestFun528528+++") {
                    isBZ = true
                }
                if (sonName == "") {
                    nameError()
                } else if (sonContent == "") {
                    contentError()
                } else {
                    var formdata = new FormData()
                    formdata.append("faid", faid)
                    formdata.append("faName", faName)
                    formdata.append("sonName", sonName)
                    formdata.append("sonContent", sonContent)
                    formdata.append("viewTime", viewTime)
                    formdata.append("email", email)
                    formdata.append("province", province)
                    formdata.append("browser", browser)
                    formdata.append("windows", windows)
                    formdata.append("IP", IP)
                    formdata.append("headImg", headImg)
                    $.ajax({
                        url: "https://modestfun.com:8080/addSonWords",
                        data: formdata,
                        type: 'POST',
                        processData: false,//必须
                        contentType: false,//必须
                        success: function () {
                            success()
                        }
                    })
                    window.setTimeout(() => {
                        if (isBZ) {
                            this.sendEmailToSon(sonId, sonContent)
                        }
                        window.location.reload(true)
                    }, 300)
                }
            }
        }
    }
    removeReply = () => {
        if ($(".reply")[0].innerHTML == "") {
            replyError()
        }
        else {
            $(".reply")[0].innerHTML = ""
        }
    }
    emailChange = (e) => {
        var str = "http://q4.qlogo.cn/g?b=qq&nk=" + e + "&s=3"
        if (e.indexOf("@") != -1) {
            if (e.split("@")[1] == "qq.com") {
                $(".emailImg")[0].src = str
            }else {
                $(".emailImg")[0].src = "https://modestfun.com:8080/getPicStoreItem?name=1588142046844"
            }
        }
        if (e.indexOf("@") == -1) {
            $(".emailImg")[0].src = "https://modestfun.com:8080/getPicStoreItem?name=1588142046844"
            if(e.split("@")[1] != "qq.com"){
                $(".emailImg")[0].src = "https://modestfun.com:8080/getPicStoreItem?name=1588142046844"
            }
        }
        // http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=QQ号

    }
    isQQEmail = (email) => {
        if (email.indexOf("@") != -1) {
            if (email.split("@")[1] != "qq.com") {
                emailWarning()
            }
        }else {
            emailWarning()
        }
    }
    render() {
        const { emoji, isshow } = this.state

        return (
            <div style={{ overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>留言 | ModestFun</title>
                    <link rel="icon" href="https://modestfun.com:8080/img/?name=logo" />
                </Helmet>
                <NavM></NavM>

                <div className="fixcontainer"></div>
                <div className="container">
                    <a href="#" id='screensTop'>&nbsp;</a>
                    <div className="wordCard">
                        <div className="cardTitle">
                            <h2 style={{ marginTop: "12px", textAlign: "center", color: "#333", fontWeight: "600", fontSize: "25px" }}>留言板</h2>
                            <p style={{ textAlign: "center", fontSize: "15px", color: "#ff6700" }}>人过留名，雁过留声</p>
                        </div>
                        <div className="textBox">
                            <div className="reply">

                            </div>
                            <h3 className="user">
                                {/* <Dropdown overlay={menu}>
                                    <Button className="headImg"><img src="https://modestfun.com:8080/getPicStoreItem?name=1586239721432" id="1586239721432" /></Button>
                                </Dropdown> */}
                                <img ref={node => this.headImg = node} className="emailImg" src="https://modestfun.com:8080/getPicStoreItem?name=1588142046844" alt="" />
                                <input ref={node => this.email = node} onChange={(e) => this.emailChange(e.target.value)}
                                    onBlur={(e) => { this.isQQEmail(e.target.value) }}
                                    className="email" type="text" placeholder="输入QQ邮箱可拉取头像" />
                                <input maxLength="18" className="username" type="text" placeholder="昵称或笔名" />
                                {/* http://q4.qlogo.cn/g?b=qq&nk=s@qq.com&s=3 */}
                                {/* http://q4.qlogo.cn/g?b=qq&nk=2770977202@qq.com&s=3  */}

                            </h3>
                            <h3 onClick={(e) => this.emojiList(e)} style={{ borderRadius: "5px", marginBottom: "0px", padding: "10px 10px", backgroundColor: "white" }}>
                                <svg style={{ cursor: "pointer", marginLeft: "7px" }} t="1586229799687" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1930" width="18" height="18"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-981.333333C251.733333 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667z" p-id="1931" fill="#ff6700"></path><path d="M298.666667 384m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" p-id="1932" fill="#ff6700"></path><path d="M725.333333 384m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" p-id="1933" fill="#ff6700"></path><path d="M520.533333 806.4c-132.266667 0-226.133333-68.266667-281.6-204.8-4.266667-12.8 0-21.333333 12.8-29.866667 12.8-4.266667 21.333333 0 29.866667 12.8 51.2 119.466667 128 174.933333 243.2 174.933334s187.733333-55.466667 226.133333-174.933334c4.266667-12.8 17.066667-17.066667 25.6-12.8 12.8 4.266667 17.066667 17.066667 12.8 25.6-46.933333 140.8-136.533333 209.066667-268.8 209.066667z" p-id="1934" fill="#ff6700"></path></svg>
                                <ul style={isshow ? { opacity: "1", display: "flex" } : { opacity: "0", display: "none" }} className="emojiList">
                                    {
                                        emoji.map((v, k) => (
                                            <li key={k}>
                                                <img onClick={(e) => this.emojiClick(e.target)} src={"https://modestfun.com:8080/getTheEmoji?name=" + v.src} alt={v.name} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </h3>

                            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                <textarea id="textarea" placeholder="你是我一生只会遇见一次的惊喜..."></textarea>
                                <Button onClick={() => this.removeReply()} style={{ marginRight: "20px", marginBottom: "10px" }}>取消回复</Button>
                                <Button onClick={() => this.subWords()} style={{ marginLeft: "20px", marginBottom: "10px" }}>提交留言</Button>
                            </div>
                        </div>
                    </div>
                    <div className="commentCard">

                    </div>
                </div>
                <BackTop />
            </div>
        )
    }
}
