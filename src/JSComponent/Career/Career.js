import React, { Component } from 'react'
import NavM from "../homepage/js/nav";
import "./career.css"
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import $ from "jquery"
export default class Career extends Component {
    state = {
        list: []
    }
    componentWillMount() {
        $.ajax({
            url: "https://modestfun.com:8080/getCareer"
        }).then(res => {
            var list = []
            var a2017 = {
                year: "2017",
                data: []
            }
            var a2018 = {
                year: "2018",
                data: []
            }
            var a2019 = {
                year: "2019",
                data: []
            }
            var a2020 = {
                year: "2020",
                data: []
            }
            var a2021 = {
                year: "2021",
                data: []
            }
            // 未来的我如果有幸看到这里，先给自己十个嘴巴子，谢谢
            // 如果还是不会，请再打自己20个嘴巴，谢谢
            res.forEach(item => {
                switch (item.year) {
                    case "2017": a2017.data.push(item.data);
                        break;
                    case "2018": a2018.data.push(item.data);
                        break;
                    case "2019": a2019.data.push(item.data);
                        break;
                    case "2020": a2020.data.push(item.data);
                        break;
                    case "2021": a2021.data.push(item.data);
                        break;
                    default: break;
                }
            })
            a2017.data = a2017.data.reverse()
            list.push(a2017)
            a2018.data = a2018.data.reverse()
            list.push(a2018)
            a2019.data = a2019.data.reverse()
            list.push(a2019)
            a2020.data = a2020.data.reverse()
            list.push(a2020)
            a2021.data = a2021.data.reverse()
            list.push(a2021)
            // 看到这里再给自己15个嘴巴子，谢谢
            this.setState({
                list: list.reverse()
            })
        })
    }
    render() {
        const { list } = this.state
        return (
            <div style={{ overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>历程 | ModestFun</title>
                    <link rel="icon" href="https://modestfun.com:8080/img/?name=logo" />
                </Helmet>
                <div className="fixcontainer"></div>
                <NavM></NavM>

                <div style={{ position: "relative" }} className="container ">
                    <Row>
                        <Col style={{position:"relative"}} offset={1} xl={22} lg={22} md={22} xs={22} sm={21}>
                            <div className="timeLineLine"></div>
                            <div className="timeLine">
                                <h1 className="titmeLineTitle">
                                    <svg t="1586869040279" style={{ transform: "translateY(8px) translateX(-10px)" }} class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1807" width="32" height="32"><path d="M725.333 699.733l-192-192v-268.8h-42.666V524.8l204.8 204.8 29.866-29.867zM512 938.667c-234.667 0-426.667-192-426.667-426.667S277.333 85.333 512 85.333s426.667 192 426.667 426.667-192 426.667-426.667 426.667z" p-id="1808" fill="#2c2c2c"></path></svg>
                            心路历程
                        </h1>
                                {
                                    list.map((v, k) => (
                                        v.data == "" ? "" : <div className="timeLineYear" key={k}>
                                            <h2 className="itemYear">{v.year} 年</h2>
                                            <ul>
                                                {
                                                    v.data.map((v2, k2) => (
                                                        <li className="itemCard" key={k2}>
                                                            <div className="fadeInLeft">
                                                                <p className="date">{v2.date}</p>
                                                            </div>
                                                            <p className="dotCircle"><svg t="1586870121200" class="picon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587" width="16" height="16"><path d="M512 448c-35.3 0-64 28.6-64 64s28.7 64 64 64 64-28.6 64-64c0-35.3-28.7-64-64-64z" p-id="2588"></path><path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 416c-88.2 0-160-71.8-160-160s71.8-160 160-160 160 71.8 160 160-71.8 160-160 160z" p-id="2589"></path><path d="M512 64C264.5 64 64 264.5 64 512c0 247.4 200.5 448 448 448 247.4 0 448-200.6 448-448 0-247.5-200.6-448-448-448z m0 800c-194.1 0-352-157.9-352-352s157.9-352 352-352 352 157.9 352 352-157.9 352-352 352z" p-id="2590"></path></svg></p>
                                                            <div className="fadeInRight">
                                                                {v2.content}
                                                            </div>
                                                            <div className="clear"></div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    ))
                                }
                                <div className="theEnd">
                                    <h1>
                                        <svg t="1586871205455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3681" width="32" height="32"><path d="M888.544169 945.712325h-33.046521c-5.81805-120.270721-32.953433-210.846117-72.376537-278.800937l-0.558533-1.396332c-41.424513-71.026749-96.160724-117.431513-153.829231-145.683961 57.668508-28.764437 112.404718-74.657212 153.829231-145.683962l0.558533-1.396332c40.726347-70.747483 68.746074-166.349674 72.981614-294.439854h32.3949a39.050749 39.050749 0 0 0 39.516193-39.143837 39.050749 39.050749 0 0 0-39.516193-39.143838H164.313357a39.190382 39.190382 0 1 0 0 78.33422h32.3949c4.700984 128.043635 32.162178 223.692371 72.981614 294.439854l0.791254 1.396331c41.424513 71.026749 95.881457 116.826436 153.782687 145.683962-57.90123 28.252449-112.358174 74.610668-153.782687 145.683962l-0.74471 1.349787c-39.097293 67.954819-66.325765 158.530215-72.143815 278.800937H164.313357a39.004204 39.004204 0 0 0-39.423105 38.53876c-0.046544 22.34131 17.593782 39.748915 39.423105 39.748915h724.230812a39.190382 39.190382 0 0 0 39.469649-39.748915 38.911116 38.911116 0 0 0-39.516193-38.53876m-577.941774-255.063294l0.605077-1.675599c47.475285-81.685416 99.418831-125.204427 168.257994-146.52176l2.699575-1.675599h0.605077c1.396332-0.558533 2.792664-1.117066 3.956274-2.234131l0.465444-0.511988 1.722143-1.16361 0.232722-0.558533 1.768687-1.675598 0.279266-0.558533c1.117066-1.16361 1.675598-2.559942 2.792664-3.956274v-0.465444a10.100134 10.100134 0 0 0 1.722143-5.678416l0.279266-0.558533v-1.722142l0.232722-1.396332v-1.070521l-0.232722-1.396332v-1.117066l-0.279266-1.117065a9.774323 9.774323 0 0 0-1.722143-5.585328v-0.558533c-1.117066-1.629054-1.675598-2.792664-2.792664-3.909729l-0.279266-0.837799-1.768687-1.396332h-0.232722l-1.675598-1.675598-0.465444-0.558533a71.399105 71.399105 0 0 0-4.002819-2.559942l-0.605077-0.279266-2.699575-1.117066c-68.839163-20.665712-120.736165-64.836345-168.257994-147.080293l-0.605077-0.558533c-37.002795-64.650167-62.090225-152.665621-66.558487-271.2142h564.862798c-3.956274 118.548578-29.136792 206.657121-66.558487 271.2142l-0.558533 0.605077c-47.335651 82.15086-99.418831 126.368037-167.699461 147.080294l-3.351197 1.070521-0.558532 0.279266-4.002819 2.559942-0.511988 0.558533-1.722143 1.675598-1.90832 1.396332-0.279266 0.837799a12.101543 12.101543 0 0 0-2.234131 3.909729l-0.605078 0.558533-1.722142 5.585328v8.377991l1.722142 5.631872 0.605078 0.511988c0.605077 1.396332 1.396332 2.792664 2.234131 3.956274l0.279266 0.558533 1.90832 1.675598v0.558533l1.722143 1.16361 0.511988 0.511988a11.403377 11.403377 0 0 0 4.002819 2.234131h0.558532l3.351197 1.675599c68.28063 21.317334 120.36381 64.836345 167.699461 146.52176l0.558533 1.675599c19.827913 33.605054 35.699552 74.42449 47.475285 121.946319 2.559942 13.544419 10.937933 43.332833 13.265153 81.918138-37.561328-33.279244-142.891298-57.715052-268.700803-59.576827V464.536351a33.651599 33.651599 0 0 0 3.770097-1.396331l0.279266-0.605078 6.748937-2.513397 0.605078-0.279266h0.558532a273.448331 273.448331 0 0 0 112.63744-66.558488c32.581078-31.882912 57.109975-71.538738 73.819414-115.243926a22.992932 22.992932 0 0 0-13.358242-30.160769 23.50492 23.50492 0 0 0-30.812391 13.451331c-14.708029 37.188973-35.187564 71.259471-62.928024 98.394854a226.112679 226.112679 0 0 1-93.088794 54.782755l-1.070521 0.558533-2.792664 0.605077-2.280675 1.117066-2.234131-1.117066-1.675598-0.605077-2.187587-0.558533a227.695189 227.695189 0 0 1-92.856071-54.782755c-27.926638-27.135383-48.313084-61.205882-63.160747-98.394854a22.853299 22.853299 0 0 0-30.160769-13.497875 23.132565 23.132565 0 0 0-13.497875 30.253857c16.802527 43.6121 40.86598 83.31447 73.819413 115.197382 29.648781 29.695325 67.11702 52.315902 112.404718 66.558488h0.279267l0.837799 0.279266 6.14386 2.513397 1.722143 0.605078 2.792664 1.303243v370.400309c-117.896957 0-219.87573 19.734824-268.654258 48.452717 1.675598-18.943569 5.585328-40.447081 13.032431-70.654394 11.682644-48.080362 27.926638-88.341265 47.475285-121.94632" p-id="3682"></path></svg>
                            THE END
                        </h1>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>


            </div>
        )
    }
}
