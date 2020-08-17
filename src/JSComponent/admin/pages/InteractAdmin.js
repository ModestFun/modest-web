import React, { Component } from 'react'
import { Table, Tag, message } from 'antd'
import "./css/allStyle.css"
import $ from 'jquery'
const success = () => {
    message.success('删除成功!');
    window.location.reload(true)
};
const { Column, ColumnGroup } = Table;
export default class InteractAdmin extends Component {
    state = {
        faList: [],
        sonList: []
    }
    componentWillMount() {
        $.ajax({
            url: "https://modestfun.com:8080/getFaWords"
        }).then(res => {
            this.setState({
                faList: res
            })
            $.ajax({
                url: "https://modestfun.com:8080/getSonWords"
            }).then(res2 => {
                this.setState({
                    sonList: res2
                })
            })
        })
    }
    removeFaWords = (_id) => {
        if (window.confirm("你确定要删除这条说说吗")) {
            $.ajax({
                url: "https://modestfun.com:8080/removeFaWords?_id=" + _id
            }).then(res => success())

        }
    }
    removeSonWords = (_id) => {
        if (window.confirm("你确定要删除这条说说吗")) {
            $.ajax({
                url: "https://modestfun.com:8080/removeSonWords?_id=" + _id
            }).then(res => success())

        }
    }
    render() {
        const { sonList, faList } = this.state
        return (
            <div>
                <h3>父级评论表</h3>
                <Table dataSource={faList}>
                    <Column title="#"
                        render={(text, record, index) => `${index + 1}`} />
                    <Column title="用户" dataIndex="username" key="username" />
                    <Column title="时间" dataIndex="viewTime" key="viewTime" />
                    <Column title="内容" dataIndex="facontent" key="facontent" />
                    <Column
                        title="操作"
                        key="action"
                        render={(record) => (
                            <span>
                                <a onClick={() => this.removeFaWords(record._id)}>删除</a>
                            </span>
                        )}
                    />
                </Table>
                <hr />
                <h3>子级评论表</h3>
                <Table dataSource={sonList}>
                    <Column title="#"
                        render={(text, record, index) => `${index + 1}`} />
                    <Column title="子评论" dataIndex="sonName" key="sonName" />
                    <Column title="被评论人" dataIndex="faName" key="faName" />
                    <Column title="时间" dataIndex="viewTime" key="viewTime" />
                    <Column width="400px" title="内容" dataIndex="sonContent" key="sonContent" />
                    <Column
                        title="操作"
                        key="action"
                        render={(record) => (
                            <span>
                                <a onClick={() => this.removeSonWords(record._id)}>删除</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}
