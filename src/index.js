import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import App from './App'
import Nav from './component/common/nav';
import { mainRoutes } from './routes'
import * as serviceWorker from './serviceWorker';
import style from './index.css'

class Modest extends Component {
  state = {
    spinning: true
  }
  componentDidMount () {
    window.setTimeout(() => {
      this.setState({
        spinning: false
      })
    }, 600)
  }
  render () {
    return (
      <Router>
        <div className='wrap'>
          <Nav></Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="fixcontainer"></div>
            <Switch>
              {/* 所有Admin的页面都走App这个组件 */}
              {/* <Route
                path="/admin"
                render={routeProps => <Admin {...routeProps}></Admin>}>
              </Route> */}
              <Route
                path="/blog"
                render={routeProps => <App {...routeProps}></App>}>
              </Route>
              {
                mainRoutes.map(route => {
                  return <Route key={route.path} {...route} />
                })
              }
              <Route exact key='/' ></Route>
              <Redirect to="/404"></Redirect>
            </Switch>
          </Suspense>
          <footer style={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "#333",
            paddingTop: "10px",
            position: "relative",
            marginTop: "15px"
          }} className="WAfooter">
            <h5 style={{
              textAlign: "center",
              color: "white",
              margin: "0px"
            }}>本系统由React + Node + Ant Design联合驱动</h5>
            <h5 style={{
              textAlign: "center",
              margin: "0px",
              color: "white"
            }}>
              Copyright © 2019-2020 ModestFun All Rights Reserved V.1.0.0 备案号
            <a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action?spm=a2c4g.11186623.2.12.4b497638zyCuzK&file=indexFirst.action"> 黑ICP备18005796号-3
            </a>
            </h5>
          </footer>
        </div>
      </Router >
    )
  }
}

ReactDOM.render(
  <Modest></Modest>,
  document.getElementById('root')
);

serviceWorker.unregister();
