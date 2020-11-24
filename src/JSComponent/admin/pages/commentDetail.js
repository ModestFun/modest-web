import React, { Component } from 'react'
import $ from "jquery"
import { Table, message } from 'antd'
import { fileIp } from "../../../routes/index"
const success = () => {
    message.success('删除成功!');
};
const { Column, ColumnGroup } = Table;
export default class commentDetail extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        var str = window.location.pathname.split("/")[3]
        $.ajax({
            url: fileIp.defaultIp +"/getCommentList?_id=" + str
        })
            .then(res => {
                $.ajax({
                    url: fileIp.defaultIp +"/getArticle?_id=" + str
                })
                    .then(result => {
                        for (var i = 0; i < result[0].notRead; i++) {
                            res[i].isShow = true
                        }
                        this.setState({
                            data: res
                        })
                    })
            })
    }
    componentDidMount() {
        var str = window.location.pathname.split("/")[3]
        $.ajax({
            url: fileIp.defaultIp +"/notReadClear?_id=" + str
        })
    }
    removeComment = (_id) => {
        $.ajax({
            url: fileIp.defaultIp +"/removeComment?_id=" + _id
        }).then(res => {
            success()
            var str = window.location.pathname.split("/")[3]
            $.ajax({
                url: fileIp.defaultIp +"/remarkCount?_id=" + str
            })
            window.location.reload(true)
        })
    }
    render() {
        const { data } = this.state
        return (
            <Table dataSource={data}>
                <Column title="#"
                    render={(text, record, index) => (
                        record.isShow ? <span style={{ color: "#ff6700" }}>{`${index + 1}`}</span> : <span>{`${index + 1}`}</span>

                    )} />

                <Column title="评论人" render={(record) => (
                    record.isShow ? <span style={{ color: "#ff6700" }}>{record.uName}</span> : <span>{record.uName}</span>
                )} />
                <Column title="他的博客" render={(record) => (
                    record.isShow ? <span style={{ color: "#ff6700" }}>{record.uBlog}</span> : <span>{record.uBlog}</span>
                )} />
                <Column title="他的邮箱" render={(record) => (
                    record.isShow ? <span style={{ color: "#ff6700" }}>{record.uEmail}</span> : <span>{record.uEmail}</span>
                )} />
                <Column width="400px" title="他的留言" render={(record) => (
                    record.isShow ? <span style={{ color: "#ff6700" }}>{record.content}</span> : <span>{record.content}</span>
                )} />
                <Column title="评论时间" render={(record) => (
                    record.isShow ? <span style={{ color: "#ff6700" }}>{record.date}</span> : <span>{record.date}</span>
                )} />
                <Column
                    title="操作"
                    key="action"
                    render={(record) => (
                        <span>
                            <a onClick={() => this.removeComment(record._id)}>删除</a>
                        </span>
                    )}
                />
            </Table>
        )
    }
}
