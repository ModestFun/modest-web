import React, { Component } from 'react'
import $ from 'jquery'
import { Button, Input, Radio, message } from 'antd';
import { fileIp } from "../../../routes/index"
const success = () => {
    message.success('友链更新成功！');
};

export default class UpdataFriend extends Component {
    state = {
        name: "",
        website: "",
        logoUrl: "",
        describe: "",
        friendType: "",
    }
    onChangeType = (e) => {
        this.setState({
            friendType: e.target.value
        })

    }
    componentWillMount() {
        var _id = window.location.pathname.split("/")[3]
        console.log(_id)
        $.ajax({
            url: fileIp.defaultIp + "/getTheFriend?_id=" + _id
        }).then(res => {
            console.log(res)
            this.setState({
                name: res[0].name,
                website: res[0].website,
                logoUrl: res[0].logoUrl,
                describe: res[0].describe,
                friendType: res[0].friendType,
            })
        }).catch(err => console.log(err))
    }
    submitClick = () => {
        var _id = window.location.pathname.split("/")[3]
        var name = $("#name")[0].value
        var website = $("#website")[0].value
        var logoUrl = $("#logoUrl")[0].value
        var describe = $("#describe")[0].value
        var friendType = this.state.friendType
        var formdata = new FormData()
        formdata.append("_id", _id)
        formdata.append("name", name)
        formdata.append("website", website)
        formdata.append("logoUrl", logoUrl)
        formdata.append("describe", describe)
        formdata.append("friendType", friendType)
        $.ajax({
            url: fileIp.defaultIp + "/updataFriend",
            data: formdata,
            type: 'POST',
            processData: false,//必须
            contentType: false,//必须
            success: function () {
                success()
                window.location.reload(true)
            }
        })
    }
    render() {
        const { name, website, logoUrl, describe, friendType } = this.state
        return (
            <div className="editorMain">
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链名字</h3>
                    <Input onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} value={name} style={{ width: "85%" }} id="name" placeholder="name" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链网址</h3>
                    <Input onChange={(e) => {
                        this.setState({ website: e.target.value })
                    }} value={website} style={{ width: "85%" }} id="website" placeholder="website" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>图标链接</h3>
                    <Input onChange={(e) => {
                        this.setState({ logoUrl: e.target.value })
                    }} value={logoUrl} style={{ width: "85%" }} id="logoUrl" placeholder="logoUrl" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链描述</h3>
                    <Input onChange={(e) => {
                        this.setState({ describe: e.target.value })
                    }} value={describe} style={{ width: "85%" }} id="describe" placeholder="describe" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链类型</h3>
                    <Radio.Group value={friendType} onChange={e => this.onChangeType(e)} id="friendType" style={{ width: "85%" }}>
                        <Radio.Button value="私人项目">私人项目</Radio.Button>
                        <Radio.Button value="身边的朋友">身边的朋友</Radio.Button>
                        <Radio.Button value="远方的伙伴">远方的伙伴</Radio.Button>
                        <Radio.Button value="大佬的博客">大佬的博客</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ marginTop: "60px", width: "100%", height: "50px", display: "flex", justifyContent: "center" }}>
                    <Button type="primary" onClick={() => { this.submitClick() }}>提交</Button>
                </div>
            </div>

        )
    }
}
