import React, { Component } from 'react'
import { Input, Button, DatePicker } from 'antd';
import $ from 'jquery'
import { Table, message, Upload } from 'antd'
const { TextArea } = Input;
const success = () => {
    message.success('删除成功!');
    window.location.reload(true)
};
const { Column } = Table;
export default class CareerOption extends Component {
    state = {
        data: [],
        date: ""
    }
    componentWillMount() {
        $.ajax({
            url: "http://localhost:3030/api-career/getCareer"
        }).then(res => {
            if (res.success === 8001) {
                res.message.forEach(item => {
                    if (item.picPath) {
                        $.ajax({ url: `http://localhost:3030/api-career${item.picPath}` })
                            .then(r => {
                                item.pic = r
                            })
                    }
                })
                this.setState({
                    data: res.message
                })
            }
        })
    }
    submitClick = () => {
        const obj = {
            date: this.state.date,
            content: $("#content")[0].value
        }
        if ($("#pic")[0].files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL($("#pic")[0].files[0], "utf8")
            reader.onload = () => {
                obj.pic = reader.result
                obj.picName = $("#fileName")[0].value
                $.ajax({
                    url: "http://localhost:3030/api-career/addCareer",
                    data: JSON.stringify(obj),
                    type: 'POST',
                    contentType: "application/json",
                    processData: false,//必须
                }).then(res => {
                    console.log(res)
                })
            }
        } else {
            $.ajax({
                url: "http://localhost:3030/api-career/addCareer",
                data: JSON.stringify(obj),
                type: 'POST',
                contentType: "application/json",
                processData: false,//必须
            }).then(res => {
                console.log(res)
            })
        }



    }
    removeFriend = (_id) => {
        if (window.confirm("你确定要删除这条历程吗？")) {
            $.ajax({
                url: "https://modestfun.com:8080/removeCareer?_id=" + _id
            }).then(res => success())

        }
    }
    onChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }
    render() {
        const { data } = this.state
        return (
            <div>
                <h3>请选择日期：</h3>
                <DatePicker onChange={(date, dateString) => this.onChange(date, dateString)} />

                <h3>内容:</h3>
                <TextArea rows={4} style={{ width: "50%" }} id="content" />
                <h3>配图：</h3>
                <input type="file" name="pic" id="pic" />
                <input type="input" name="fileName" id="fileName" />
                <br />
                <br />
                <Button onClick={() => { this.submitClick() }}>提交</Button>
                <hr />
                <Table dataSource={data}>
                    <Column title="#"
                        render={(text, record, index) => `${index + 1}`} />
                    <Column title="日期" dataIndex="date" key="date" />
                    <Column title="内容" dataIndex="content" key="content" />
                    <Column title="配图" render={(text, record, index) => <img style={{width:"100px",height:"50px"}} src={record.pic} />} />
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

            </div >
        )
    }
}
