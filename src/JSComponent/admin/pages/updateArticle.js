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
    message.success('文章更新成功！');
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
export default class updateArticle extends Component {
    state = {
        headTitle: "",
        contentTitle: "",
        imgUrl: "",
        imgUrl: "",
        contentType: "",
        contentTag: "",
        headTitle: "",
        date: "",
        pic: "",
        md: "",
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
        var _id = window.location.pathname.split("/")[3]
        var headTitle = $("#headTitle")[0].value
        var contentTitle = $("#contentTitle")[0].value
        var titleText = $("#titleText")[0].value
        var contentType = this.state.contentType
        var contentTag = this.state.contentTag
       
        var formdata = new FormData()
        if (headTitle != "" && contentTitle != "" && titleText != "") {
            if (this.state.md == "") {
                var mdUrl = undefined
            } else {
                var mdUrl = this.state.md.file.originFileObj
            }
            if (this.state.pic == "") {
                titleImg = undefined
            } else {
                var titleImg = this.state.pic.file.originFileObj
            }
            console.log(titleImg)
            formdata.append("_id", _id)
            formdata.append("headTitle", headTitle)
            formdata.append("contentTitle", contentTitle)
            formdata.append("titleText", titleText)
            formdata.append("contentTag", contentTag)
            formdata.append("contentType", contentType)
            formdata.append("titleImg", titleImg)
            formdata.append("mdUrl", mdUrl)
            $.ajax({
                url: "https://modestfun.com:8080/updataArticle",
                data: formdata,
                type: 'POST',
                processData: false,//必须
                contentType: false,//必须
                success: function () {
                    success()
                    window.location.reload(true)
                }
            })

        } else {
            titleError()
        }

    }
    componentWillMount() {
        var _id = window.location.pathname.split("/")[3]
        $.ajax({
            url: "https://modestfun.com:8080/getArticle?_id=" + _id
        }).then(res => {
            var imgUrl = "https://modestfun.com:8080/articleImg/?name=" + res[0].titleImg
            var mdUrl = "https://modestfun.com:8080/articleMd/?name=" + res[0].MdUrl
            this.setState({
                headTitle: res[0].headTitle,
                contentTitle: res[0].contentTitle,
                imgUrl: imgUrl,
                titleText: res[0].titleText,
                contentType: res[0].contentType,
                contentTag: res[0].contentTag,
                headTitle: res[0].headTitle,
                date: res[0].date,
                mdUrl: mdUrl
            })
        })
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
        const { headTitle, contentTitle, titleText, imgUrl, mdUrl, contentType, contentTag } = this.state
        return (
            <div className="editorMain">
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>主标题</h3>
                    <Input onChange={(e) => {
                        this.setState({ headTitle: e.target.value })
                    }} value={headTitle} style={{ width: "85%" }} id="headTitle" placeholder="headTitle" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>副标题</h3>
                    <Input onChange={(e) => {
                        this.setState({ contentTitle: e.target.value })
                    }} value={contentTitle} style={{ width: "85%" }} id="contentTitle" placeholder="contentTitle" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>内容简介</h3>
                    <TextArea onChange={(e) => {
                        this.setState({ titleText: e.target.value })
                    }} value={titleText} style={{ width: "85%" }} id="titleText" rows={4} placeholder="The article briefly describes" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>文章类型</h3>
                    <Radio.Group value={contentType} onChange={e => this.onChangeType(e)} id="contentType" style={{ width: "85%" }}>
                        <Radio.Button value="原创">原创</Radio.Button>
                        <Radio.Button value="转载">转载</Radio.Button>
                        <Radio.Button value="抄袭">抄袭</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>文章标签</h3>
                    <Radio.Group value={contentTag} onChange={e => this.onChangeTag(e)} id="contentTag" style={{ width: "85%" }}>
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
                        <div style={{ boxSizing: "border-box", height: "150px" }}>
                            <h3>当前title封面图片</h3>
                            <img style={{ width: "150px", height: "120px" }} src={imgUrl} alt="" />
                        </div>
                        <h3>上传新的title封面</h3>
                        <Upload {...props} onChange={(file) => { this.handleChange(file) }}>
                            <Button>
                                封面图片上传
                            </Button>
                        </Upload>
                    </div>
                    <div style={{ width: "50%", padding: "0px 27px" }}>
                        <div style={{ boxSizing: "border-box", height: "150px" }}>
                            <h3><a style={{ cursor: "pointer" }} href={mdUrl}>当前md文件</a></h3>
                        </div>
                        <h3>上传新的md文件</h3>
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
