import React, { Component } from 'react'
import axios from 'axios'
import { Table, Tag, message } from 'antd'
import "./css/allStyle.css"
import $ from 'jquery'
const success = () => {
    message.success('删除成功!');
    window.location.reload(true)
};
const { Column, ColumnGroup } = Table;


export default class managementArticle extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        var modestAxios = axios.create({
            baseURL: "https://modestfun.com:8080"
        })
        modestAxios.get("/getArticleList")
            .then(res => res.data)
            .then(res => {
                res.forEach((item) => {
                    var aaa = item.date.split(".")
                    item.date = aaa[0] + "." + aaa[1] + "." + aaa[2] + " " + aaa[3] + ":" + aaa[4]

                })
                this.setState({
                    data: res
                })
            })
    }
    removeActicle = (_id) => {
        if (window.confirm("你确定要删除这条说说吗")) {
            $.ajax({
                url: "https://modestfun.com:8080/removeArticle?_id=" + _id
            }).then(res => success())

        }
    }
    updataActicle = (_id) => {
        window.location.href = "/admin/updateArticle/" + _id
    }
    render() {
        const { data } = this.state
        return (
            <Table dataSource={data}>
                 <Column title="#"
                 render={(text,record,index)=>`${index+1}`} />
                <Column title="主标题" dataIndex="headTitle" key="headTitle" />
                <Column title="副标题" dataIndex="contentTitle" key="contentTitle" />
                <Column title="内容简介" dataIndex="titleText" key="titleText" />
                <Column title="类型" dataIndex="contentType" key="contentType" />
                <Column title="标签" dataIndex="contentTag" key="contentTag" />
                <Column title="更新时间" dataIndex="date" date key="date" />
                <Column

                    title="操作"
                    key="action"
                    render={(record) => (
                        <span>
                            <a onClick={() => this.updataActicle(record._id)} style={{ marginRight: 16 }}>修改</a>
                            <a onClick={() => this.removeActicle(record._id)}>删除</a>
                        </span>
                    )}
                />
            </Table>
        );
    }
}