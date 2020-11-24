import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom'
import "antd/dist/antd.css";
import { Helmet } from 'react-helmet';
import { Form, Input, Button } from 'antd';
import './css/admin.css'
import logo from '../admin/img/logo.png'
import { message } from 'antd';
import { fileIp } from "../../routes/index"
const success = () => {
    message.success('欢迎博主回到快乐老家！');
};
const passwordError = () => {
    message.error('博主的快乐老家不是谁都可以进的!');
};
export default class Login extends Component {
    state = {
        username: "modestfun",
        password: "528528+++"
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {
        const { username, password } = this.state
        return (
            <div className="container LoginMain">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login | ModestFun的个人博客</title>
                    <link rel="icon" href={fileIp.defaultIp + "/img/?name=logo"} />
                </Helmet>
                <div className="login">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item className="formtitle">
                            <div className="logoTitle">
                                <img style={{ borderRadius: "50%", backgroundColor: "white", width: "25px", height: "25px", marginTop: "3px" }} src={logo} alt="" />
                                <h3 style={{ color: "#ff6700" }}>ModestFun | Admin</h3>
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="username"

                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input value={username} style={{ textAlign: "center" }} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                id="pass"
                                style={{ textAlign: "center" }}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button btnLogin">
                                <Link
                                    onClick={(e) => {
                                        var nowPassword = document.getElementById("pass").value
                                        if (nowPassword === password) {
                                            const d = new Date()
                                            d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
                                            const expires = "expires=" + d.toGMTString()
                                            document.cookie = "password=" + nowPassword + "; " + expires;
                                            success()
                                        }
                                        else {
                                            e.preventDefault();
                                            passwordError()
                                        }
                                    }}
                                    to="/admin">博主的秘密花园</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>


            </div>
        )
    }
}

