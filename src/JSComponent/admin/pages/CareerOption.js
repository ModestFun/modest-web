import React, { Component } from 'react'
import { Input, Button } from 'antd';
import $ from 'jquery'
import { Table, Tag, message } from 'antd'
import { fileIp } from "../../../routes/index"
const success = () => {
    message.success('删除成功!');
    window.location.reload(true)
};
const { Column, ColumnGroup } = Table;
export default class CareerOption extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        $.ajax({
            url: fileIp.defaultIp + "/getCareer"
        }).then(res => {
            this.setState({
                data: res
            })
        })
    }
    submitClick = () => {
        var year = $("#year")[0].value
        var date = $("#date")[0].value
        var content = $("#content")[0].value
        var formdata = new FormData()
        formdata.append("year", year)
        formdata.append("date", date)
        formdata.append("content", content)
        $.ajax({
            url: fileIp.defaultIp + "/addCareer",
            data: formdata,
            type: 'POST',
            processData: false,//必须
            contentType: false,//必须
        }).then(res => {
            window.location.reload(true)
        })
    }
    removeFriend = (_id) => {
        if (window.confirm("你确定要删除这条历程吗？")) {
            $.ajax({
                url: fileIp.defaultIp + "/removeCareer?_id=" + _id
            }).then(res => success())

        }
    }
    render() {
        const { data } = this.state
        console.log(data)
        return (
            <div>
                <h3>年份:<Input id="year" style={{ width: "500px", marginLeft: "20px" }} placeholder="year" /></h3>
                <h3>日期:<Input id="date" style={{ width: "500px", marginLeft: "20px" }} placeholder="date" /></h3>
                <h3>内容:<Input id="content" style={{ width: "500px", fontSize: "12px", marginLeft: "20px" }} placeholder="content" /></h3>
                <Button onClick={() => { this.submitClick() }}>提交</Button>
                <hr />
                <Table dataSource={data}>
                    <Column title="#"
                        render={(text, record, index) => `${index + 1}`} />
                    <Column title="年份" dataIndex="year" key="year" />
                    <Column title="日期" render={(text, record, index) => `${record.data.date}`} />
                    <Column title="内容" render={(text, record, index) => `${record.data.content}`} />
                    <Column

                        title="操作"
                        key="action"
                        render={(record) => (
                            <span>
                                <a onClick={() => this.removeFriend(record._id)}>删除</a>
                            </span>
                        )}
                    />
                </Table>

            </div>
        )
    }
}
