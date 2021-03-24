/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import "./contentDetail.css"
import { Button, PageHeader, message, Input } from 'antd';
import MarkDown from './Markdown'
import CommentDetail from "./CommentDetail"
// import $ from "jquery"
import { fileIp } from "../../routes/index"
const emailWarning = () => {
    message.warning('检测到您输入的不是QQ邮箱，建议更换成QQ邮箱！');
};
const { TextArea } = Input;
// const emailError = () => {
//     message.error('您的邮箱有误，请输入正确的QQ邮箱');
// };
// const success = () => {
//     message.success('评论发表成功！');
// };

const speakError = () => {
    message.error('2分钟之内只能发送一次评论！');
};
// const hideError = () => {
//     message.error('您还没有引用他人的言论！');
// };
// const titleError = () => {
//     message.error('留言内容和您的名字不可以为空');
// };
export default class ContentDetail extends Component {
    state = {
        checked: false,
        commentList: [],
        num: 0,
        canSpeak: true
    }
    componentWillMount() {
        // var str = window.location.pathname.split("/")[2]
        // $.ajax({
        //     url:  fileIp.defaultIp +"/getCommentList?_id=" + str
        // }).then(res => {
        //     this.setState({
        //         commentList: res,
        //         num: res.length
        //     })
        // }).catch(err => console.log(err))
    }
    onChange = (e) => {
        this.setState({
            checked: e.target.checked
        })
    }
    commentReload = () => {
        // var str = window.location.pathname.split("/")[2]
        // $.ajax({
        //     url:  fileIp.defaultIp +"/getCommentList?_id=" + str
        // }).then(res => {
        //     this.setState({
        //         commentList: res,
        //         num: res.length,
        //         canSpeak: false
        //     })
        //     window.setTimeout(() => {
        //         this.setState({
        //             canSpeak: true
        //         })
        //     }, 120000);

        // }).catch(err => console.log(err))
        // $.ajax({
        //     url:  fileIp.defaultIp +"/remarkCount?_id=" + str
        // })
        //     .then(res => { })
        //     .catch(err => { console.log(err) })
    }
    clearBtn = () => {
        // $(".uContent")[0].value = ""
        // $(".uName")[0].value = ""
        // $(".uEmail")[0].value = ""
        // $(".uBlog")[0].value = ""
        // var hide = document.getElementsByClassName("hide")[0]
        // if (hide !== "") {
        //     this.clearHide()
        // }
    }
    btnClick = () => {
        // var hide = document.getElementsByClassName("hide")[0]
        // var content = ""
        // if (hide.innerHTML !== "") {
        //     var atsb = document.getElementsByClassName("atSB")
        //     atsb = atsb[atsb.length - 1]
        //     content = `<div class="atSB">` + atsb.innerHTML + `</div><br/>`
        // }
        // content += $(".uContent")[0].value
        // var uName = $(".uName")[0].value
        // var uEmail = $(".uEmail")[0].value
        // var uBlog = $(".uBlog")[0].value
        // var topic_id = window.location.pathname.split("/")[2]
        // var date = new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 ' + new Date().getHours() + ':' + new Date().getMinutes()
        // var formdata = new FormData()
        // if (uEmail.indexOf("@") === -1) {
        //     emailError()
        // } else if (uEmail.split("@")[1] !== "qq.com") {
        //     emailWarning()
        // } else if (content === "" || uName === "") {
        //     titleError()
        // } else {
        //     if (uBlog === "") {
        //         uBlog = "null"
        //     }
        //     window.setTimeout(() => {
        //         this.clearBtn()
        //     }, 300)
        //     formdata.append("content", content)
        //     formdata.append("uName", uName)
        //     formdata.append("uEmail", uEmail)
        //     formdata.append("topic_id", topic_id)
        //     formdata.append("uBlog", uBlog)
        //     formdata.append("date", date)

        //     $.ajax({
        //         url:  fileIp.defaultIp +"/addComment",
        //         data: formdata,
        //         type: 'POST',
        //         processData: false,//必须
        //         contentType: false,//必须
        //         success: function () {
        //             success()
        //         }
        //     })
        //     this.commentReload()
        //     // this.notReadCount(topic_id)
        //     this.scrollToAnchor('screens1')
        // }
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
    clearHide = () => {
        var hide = document.getElementsByClassName("hide")[0]
        if (hide.innerHTML === "") {
            // hideError()
        } else {
            hide.innerHTML = ""
        }
    }
    componentDidMount() {
        // $(".waifu")[0].style.display = "none"
        // window.setTimeout(() => {
        //     var p = $("blockquote p")
        //     for (var i = 0; i < p.length; i++) {
        //         var str = p[i].innerHTML
        //         for (var j = 0; j < str.length; j++) {
        //             str = str.replace("&lt;br&gt;", "<br>")
        //             str = str.replace("\n", "<br>")
        //             str = str.replace("\r", "")
        //         }
        //         p[i].innerHTML = str
        //     }
        // }, 500)
    }
    isQQEmail = (email) => {
        if (email.indexOf("@") !== -1) {
            if (email.split("@")[1] !== "qq.com") {
                emailWarning()
            }
        }
    }
    render() {
        const { commentList, num, canSpeak } = this.state
        const { v, md } = this.props
        return (
            <div className="contentDetail">
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        window.location.href =  fileIp.onLineIp
                    }}
                    style={{ backgroundColor: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
                    title={v.headTitle}
                />
                <div className="contentTitle">
                    <h2 style={{ textAlign: "center", color: "#333" }}>【{v.contentType}】{v.contentTitle}</h2>
                    <div className="spanGroup">
                        <span>
                            <svg t="1585306129126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1173" width="16" height="16"><path d="M841.5 956.3h-659c-63.1 0-114.4-51.3-114.4-114.4V265.3c0-63.1 51.3-114.4 114.4-114.4h659c63.1 0 114.4 51.3 114.4 114.4v576.6c0 63.1-51.4 114.4-114.4 114.4zM182.5 215c-27.8 0-50.4 22.6-50.4 50.4V842c0 27.8 22.6 50.4 50.4 50.4h659c27.8 0 50.4-22.6 50.4-50.4V265.3c0-27.8-22.6-50.4-50.4-50.4h-659z" fill="#ff6700" p-id="1174"></path><path d="M685 425.5H339c-17.6 0-32 14.4-32 32s14.4 32 32 32h346c17.6 0 32-14.4 32-32s-14.4-32-32-32zM685 632.9H339c-17.6 0-32 14.4-32 32s14.4 32 32 32h346c17.6 0 32-14.4 32-32s-14.4-32-32-32z" fill="#ff6700" p-id="1175"></path><path d="M326.5 66.3c-17.6 0-32 14.4-32 32v141c0 17.6 14.4 32 32 32s32-14.4 32-32v-141c0-17.6-14.4-32-32-32zM697.5 66.3c-17.6 0-32 14.4-32 32v141c0 17.6 14.4 32 32 32s32-14.4 32-32v-141c0-17.6-14.4-32-32-32z" fill="#ff6700" p-id="1176"></path></svg>
                            {v.date}
                        </span>
                        <span>
                            <svg t="1585306184285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1193" width="16" height="16"><path d="M931.479305 1023.72653a44.607686 44.607686 0 0 1-26.473404-8.47149L511.611119 730.930682 118.216336 1015.122673a44.740053 44.740053 0 0 1-46.857924 4.103378A45.137154 45.137154 0 0 1 47.135247 979.515945V45.004787A45.004787 45.004787 0 0 1 92.140034 0h839.471638a45.004787 45.004787 0 0 1 45.004787 45.004787v933.716956a45.269521 45.269521 0 0 1-45.137154 45.004787z" fill="#ff6700" p-id="1194"></path><path d="M277.850962 223.83263a38.783537 38.783537 0 0 0 38.783537 38.65117h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.783537zM277.850962 472.55026a38.783537 38.783537 0 0 0 38.783537 38.783537h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.65117z" fill="#ff6700" p-id="1195"></path></svg>
                            {v.contentTag}
                        </span>
                        <span>
                            <svg t="1585306219442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="822" width="16" height="16"><path d="M398.934898 897.042493c0 0-113.547079-101.719706 41.290405-319.997058 0 0 34.408671 33.619702 41.290405 63.260789 0 0 68.816319-52.9387 55.05285-190.571337 0 0 233.976916 158.27784 120.428813 447.307605 0 0 354.405729-101.719706 65.375963-543.650861 0 0-6.881734 61.934584-27.526937 82.579787 0 0-20.645203-206.449979-306.23359-309.674968 0 0 107.812471 212.184587-61.934584 368.169197 0 0-19.498076-47.025013-47.025013-88.314395 0 0-8.606005 98.797144-69.971631 151.921062C171.864276 590.808904 128.257106 855.753111 398.934898 897.042493z" p-id="823" fill="#ff6700"></path></svg>
                            {v.browseNum}
                        </span>
                    </div>

                    <div className="detailMD">
                        <MarkDown md={md}></MarkDown>
                        <a href="#" id='screens1'>&nbsp;</a>
                        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>- - - THE END - - -</h3>

                    </div>

                    <div className="comment">
                        <h2>留言（<span className="commentCount">{num}</span>条） </h2>
                        <hr />
                        <div className="commentList"></div>
                        {
                            commentList.map((v, k) => (
                                <CommentDetail key={k} v={v}></CommentDetail>
                            ))
                        }

                        <div className="leaveWord">
                            <a href="#" id='screens2'>&nbsp;</a>
                            <h2>我要发表看法</h2>
                            <hr />
                            <h4>您的留言 <a style={{ float: "right" }} onClick={() => {
                                this.clearHide()
                            }}>取消引用</a> </h4>
                            <div className="hide"></div>
                            <TextArea className="uContent" rows={4} />
                            <h4>您的名字</h4>
                            <Input className="uName" style={{ width: "300px" }} placeholder="您的笔名或昵称" />
                            <h4>电子邮箱</h4>
                            <Input
                                onBlur={(e) => { this.isQQEmail(e.target.value) }}
                                className="uEmail" style={{ width: "300px" }} placeholder="您的QQ邮箱" />
                            <h4>个人网站<span> ( 例: modestfun.com )</span></h4>
                            <Input className="uBlog" style={{ width: "300px" }} placeholder="选填，我信任您不会填写广告链接！" />
                            <br />
                            <Button style={{ marginTop: "20px", marginLeft: "100px" }} type="primary" onClick={() => {
                                if (canSpeak) {
                                    this.btnClick()
                                } else {
                                    speakError()
                                }
                            }}>发表</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
