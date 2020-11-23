import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { adminRoutes } from "./routes"
import Frame from "./JSComponent/admin/frames/index"
import { Helmet } from 'react-helmet';

function App() {
  return (
    <Frame>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | Modest的管理页面</title>
        <link rel="icon" href="https://modestfun.com:8080/img/?name=logo" />
      </Helmet>
      <Switch>
        {
          adminRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={routeProps => {
                  return <route.component {...routeProps} />
                }}></Route>
            )
          })
        }
        <Redirect to="/404"></Redirect>
      </Switch>
    </Frame>
  )
}


export default App;
