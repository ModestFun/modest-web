import React, { Component } from 'react'
import "./contentDetail.css"

export default class CommentDetail extends Component {
    spanClick = (e) => {
        // $.ajax({
        //     url: fileIp.defaultIp +"/getTheComment?_id=" + e
        // }).then(res => {
        //     if (res[0].content.substring(0, 18) === `<div class="atSB">`) {
        //         res[0].content = res[0].content.split("<br/>")[1]
        //     }
        //     var div = document.createElement("div")
        //     div.className = "atSB"
        //     var h3 = document.createElement("h3")
        //     if(res[0].uName === "ModestFun528528+++"){
        //         res[0].uName = "博主"
        //     }
        //     h3.innerHTML = "引用 " + res[0].uName + " 的发言："
        //     var p = document.createElement("p")
        //     var str = res[0].content
        //     for (var j = 0; j < str.length; j++) {
        //         str = str.replace("&lt;br&gt;", "<br>")
        //         str = str.replace("\n", "<br>")
        //         str = str.replace("\r", "")
        //     }
        //     p.innerHTML = str
        //     div.appendChild(h3)
        //     div.appendChild(p)
        //     document.getElementsByClassName("hide")[0].innerHTML = ""
        //     document.getElementsByClassName("hide")[0].appendChild(div)
        //     this.scrollToAnchor("screens2")
        // })
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
        const { v } = this.props
        var str = v.content
        for (var j = 0; j < str.length; j++) {
            str = str.replace("&lt;br&gt;", "<br>")
            str = str.replace("\n", "<br>")
            str = str.replace("\r", "")
        }
        if(v.uName === "ModestFun528528+++"){
            v.uName = "博主"
        }
        v.content = str
        return (
            <div style={{ position: "relative", paddingBottom: "5px", borderBottom: "1px solid rgb(208,208,208)" }}>
                {
                    // eslint-disable-next-line react/jsx-no-target-blank
                    v.uBlog === "null" ? ( v.uName === "博主" ? <h3 style={{ color:"#ff6700",fontWeight: "600" }}>{v.uName} 说:</h3> :<h3 style={{ fontWeight: "600" }}>{v.uName} 说:</h3>) : <h3 style={{ fontWeight: "600" }}> <a href={v.uBlog} target="_blank" >{v.uName}</a> 说:</h3>
                }
                <p dangerouslySetInnerHTML={{ __html: v.content }} style={{ padding: "0px 20px" }}></p>
                <div style={{ width: "100%", height: "18px" }}>
                    <span style={{ float: "right" }}>{v.date} | <span id={v._id} onClick={(e) => { this.spanClick(e.target.id) }} className="yinyong">引用</span></span>
                </div>
            </div>
        )
    }
}
