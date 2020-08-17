import React, { Component } from 'react'
import $ from 'jquery'
import {  Button, Input, Radio } from 'antd';

export default class FriendLink extends Component {
    state = {
        pic: "",
        md: "",
        friendType: "私人项目",
        data: []
    }
    onChangeType = (e) => {
        this.setState({
            friendType: e.target.value
        })

    }
    componentWillMount() {
        $.ajax({
            url: "https://modestfun.com:8080/getFriend"
        }).then(res => {
            this.setState({
                data: res
            })
        })
    }
    submitClick = () => {
        var name = $("#name")[0].value
        var website = $("#website")[0].value
        var logoUrl = $("#logoUrl")[0].value
        var describe = $("#describe")[0].value
        var friendType = this.state.friendType
        var formdata = new FormData()
        formdata.append("name", name)
        formdata.append("website", website)
        formdata.append("logoUrl", logoUrl)
        formdata.append("describe", describe)
        formdata.append("friendType", friendType)
        $.ajax({
            url: "https://modestfun.com:8080/addFriend",
            data: formdata,
            type: 'POST',
            processData: false,//必须
            contentType: false,//必须
        }).then(res => {
            window.location.reload(true)
        })
    }
   
    render() {
        return (
            <div>
                <div className="editorMain">
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链名字</h3>
                        <Input style={{ width: "85%" }} id="name" placeholder="name" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链网址</h3>
                        <Input style={{ width: "85%" }} id="website" placeholder="website" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>图标链接</h3>
                        <Input style={{ width: "85%" }} id="logoUrl" placeholder="logoUrl" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链描述</h3>
                        <Input style={{ width: "85%" }} id="describe" placeholder="describe" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <h3 style={{ width: "100px", textAlign: "center", height: "48px", boxSizing: "border-box", lineHeight: "38px" }}>友链类型</h3>
                        <Radio.Group onChange={e => this.onChangeType(e)} id="friendType" style={{ width: "85%" }} defaultValue="私人项目">
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
              
               
            </div>
        )
    }
}
