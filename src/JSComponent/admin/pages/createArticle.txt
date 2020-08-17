import React, { Component } from 'react'
import "./css/ArticleEditor.css"
import 'antd/dist/antd.css';
import $ from "jquery"
import { Upload, Button, Input, Radio, message } from 'antd';

const { TextArea } = Input;
const fileList = []
const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [...fileList],
};
const success = () => {
    message.success('文章上传成功！');
};

const picError = () => {
    message.error('图片文件格式错误或为空!只能上传.png或.jpg图片!');
};
const mdError = () => {
    message.error('Markdown文件格式错误或为空!只能上传.md文件!');
};
const titleError = () => {
    message.error('主标题、副标题、内容简介均不可为空！');
};

export default class createArticle extends Component {
    state = {
        pic: "",
        md: "",
        contentTag: "个人日记",
        contentType: "原创"
    }
    onChangeType = (e) => {
        this.setState({
            contentType: e.target.value
        })

    }
    onChangeTag = (e) => {
        this.setState({
            contentTag: e.target.value
        })
    }

    submitClick = () => {
        var headTitle = $("#headTitle")[0].value
        var contentTitle = $("#contentTitle")[0].value
        var titleText = $("#titleText")[0].value
        var contentType = this.state.contentType
        var contentTag = this.state.contentTag
        var date = new Date().getFullYear() + "." + (new Date().getMonth() + 1) + '.' + new Date().getDate() + '.' + new Date().getHours() + '.' + new Date().getMinutes()
        var formdata = new FormData()
        if (this.state.pic == "" || this.state.md == "") {
            if (this.state.pic == "") {
                picError()
            } else if (this.state.md == "") {
                mdError()
            }
        } else {
            var titleImg = this.state.pic.file.originFileObj
            var mdUrl = this.state.md.file.originFileObj
            if (headTitle != "" && contentTitle != "" && titleText != "") {
                formdata.append("headTitle", headTitle)
                formdata.append("contentTitle", contentTitle)
                formdata.append("titleText", titleText)
                formdata.append("contentTag", contentTag)
                formdata.append("contentType", contentType)
                formdata.append("titleImg", titleImg)
                formdata.append("mdUrl", mdUrl)
                formdata.append("date", date)
                var checkImg = titleImg.name.split(".")[1]
                var checkMd = mdUrl.name.split(".")[1]
                if (checkMd == "md" && (checkImg == "png" || checkImg == "jpg" || checkImg == "jpeg")) {
                    $.ajax({
                        url: "https://modestfun.com:8080/addArticle",
                        data: formdata,
                        type: 'POST',
                        processData: false,//必须
                        contentType: false,//必须
                        success: function () {
                            success()
                            window.location.reload(true)
                        }
                    })
                }else{
                    if(checkMd != "md"){
                        mdError()
                    }else{
                        picError()
                    }
                }
            } else {
                titleError()
            }
        }
    }
    handleChange = (file) => {
        this.setState({
            pic: file
        })
    }
    handleChangeMD = (md) => {
        this.setState({
            md: md
        })
    }
    render() {
        return (
            <div className="editorMain">
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>主标题</h3>
                    <Input style={{ width: "85%" }} id="headTitle" placeholder="headTitle" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>副标题</h3>
                    <Input style={{ width: "85%" }} id="contentTitle" placeholder="contentTitle" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>内容简介</h3>
                    <TextArea style={{ width: "85%" }} id="titleText" rows={4} placeholder="The article briefly describes" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>文章类型</h3>
                    <Radio.Group onChange={e => this.onChangeType(e)} id="contentType" style={{ width: "85%" }} defaultValue="原创">
                        <Radio.Button value="原创">原创</Radio.Button>
                        <Radio.Button value="转载">转载</Radio.Button>
                        <Radio.Button value="抄袭">抄袭</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>文章标签</h3>
                    <Radio.Group onChange={e => this.onChangeTag(e)} id="contentTag" style={{ width: "85%" }} defaultValue="个人日记">
                        <Radio.Button value="个人日记">个人日记</Radio.Button>
                        <Radio.Button value="学习笔记">学习笔记</Radio.Button>
                        <Radio.Button value="杂文集">杂文集</Radio.Button>
                        <Radio.Button value="技术分享">技术分享</Radio.Button>
                        <Radio.Button value="王老师和米米">王老师和米米</Radio.Button>
                        <Radio.Button value="其他">其他</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <div style={{ width: "50%", padding: "0px 27px" }}>
                        <h3>上传title封面</h3>
                        <Upload {...props} onChange={(file) => { this.handleChange(file) }}>
                            <Button>
                                封面图片上传
                            </Button>
                        </Upload>
                    </div>
                    <div style={{ width: "50%", padding: "0px 27px" }}>
                        <h3>上传md文件</h3>
                        <Upload {...props} onChange={(file) => { this.handleChangeMD(file) }}>
                            <Button>
                                .MD文件上传
                            </Button>
                        </Upload>
                    </div>
                </div>
                <div style={{ marginTop: "60px", width: "100%", height: "50px", display: "flex", justifyContent: "center" }}>
                    <Button type="primary" onClick={() => { this.submitClick() }}>提交</Button>
                </div>

            </div>
        )
    }

}
