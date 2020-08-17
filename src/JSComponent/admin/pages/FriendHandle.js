import React, { Component } from 'react'
import $ from 'jquery'
import { Table, message } from 'antd'
const success = () => {
    message.success('删除成功!');
    window.location.reload(true)
};
const { Column, ColumnGroup } = Table;
export default class FriendHandle extends Component {
    state = {
       
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
    removeFriend = (_id) => {
        if (window.confirm("你确定要删除这条友链吗？")) {
            $.ajax({
                url: "https://modestfun.com:8080/removeFriend?_id=" + _id
            }).then(res => success())

        }
    }
    updataFriend = (_id) => {
        window.location.href = "/admin/updateFriend/" + _id
    }
    render() {

        const { data } = this.state
        return (
            <div>
                <Table dataSource={data}>
                    <Column title="#"
                        render={(text, record, index) => `${index + 1}`} />
                    <Column title="会员ID" dataIndex="describe" key="describe" />
                    <Column title="会员名" dataIndex="friendType" key="friendType" />
                    <Column title="会员等级" dataIndex="logoUrl" key="logoUrl" />
                    <Column title="联系方式" dataIndex="name" key="name" />
                    <Column title="住址" dataIndex="website" key="website" />
                    <Column

                        title="操作"
                        key="action"
                        render={(record) => (
                            <span>
                                <a onClick={() => this.updataFriend(record._id)} style={{ marginRight: 16 }}>修改</a>
                                <a onClick={() => this.removeFriend(record._id)}>删除</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}
