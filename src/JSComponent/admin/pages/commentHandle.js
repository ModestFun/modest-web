import React, { Component } from 'react'
import $ from 'jquery'
import { Table, Tag, message } from 'antd'
import "./css/allStyle.css"
import { fileIp } from "../../../routes/index"
const { Column } = Table;
export default class commentHandle extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        $.ajax({
            url: fileIp.defaultIp + "/getArticleList"
        })
            .then(res => {
                for (var i = 0; i < res.length; i++) {
                    for (var j = i; j < res.length; j++) {
                        if (res[i].notRead < res[j].notRead) {
                            var max = res[j]
                            res[j] = res[i]
                            res[i] = max
                        }
                    }
                }
                this.setState({
                    data: res
                })
            })
    }

    enterComment = (_id) => {
        window.location.href = "/admin/commentHandle/" + _id
    }
    render() {
        const { data } = this.state
        return (
            <Table dataSource={data}>
                <Column title="#"
                    render={(text, record, index) => `${index + 1}`} />
                <Column title="文章名字" dataIndex="headTitle" key="headTitle" />
                <Column width="300px" title="文章内容" dataIndex="titleText" key="titleText" />
                <Column align="center" title="文章类型" dataIndex="contentType" key="contentType" />
                <Column align="center" title="文章标签" dataIndex="contentTag" key="contentTag" />
                <Column align="center" title="浏览数" dataIndex="browseNum" key="browseNum" />
                <Column align="center" title="评论数" dataIndex="remark" key="remark" />
                <Column align="center" title="未读数" dataIndex="notRead" key="notRead" />
                {/* <Column title="评论人" dataIndex="uName" key="uName" />
                <Column title="他的博客" dataIndex="uBlog" key="uBlog" />
                <Column title="他的邮箱" dataIndex="uEmail" key="uEmail" />
                <Column width="400px" title="他的留言" dataIndex="content" key="content" />
                <Column title="评论时间" dataIndex="date" key="date" /> */}
                <Column
                    title="操作"
                    key="action"
                    render={(record) => (
                        <span>
                            <a onClick={() => this.enterComment(record._id)}>进入</a>
                        </span>
                    )}
                />
            </Table>
        )
    }
}
