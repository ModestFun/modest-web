import React, { Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { blogRoutes } from "./routes"
import { Helmet } from 'react-helmet';
const BlogFrames = React.lazy(() => import('./JSComponent/blog/BlogFrames'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogFrames>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Blog | ModestFun的个人博客</title>
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
    </Suspense>
  )
}


export default App;
