import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { blogRoutes } from "./routes"
import { Helmet } from 'react-helmet';
import BlogFrames from "./JSComponent/blog/BlogFrames"

function Blog() {
  return (
    <BlogFrames>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | ModestFun</title>
        <link rel="icon" href="https://modestfun.com:8080/img/?name=logo" />
      </Helmet>
      <Switch>
        {
          blogRoutes.map(route => {
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
    </BlogFrames>
  )
}


export default Blog;
