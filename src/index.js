import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { mainRoutes } from "./routes";
import App from "./App";
import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                {/*配置顶层路由，登录页、Home页*/}

                {/*配置Home，即登录后用户能看到的页面，render将路由信息传给下一层组件处理*/}
                <Route path="/home" render={routeProps => <App {...routeProps} />} />

                {/*配置不需要登录就能看到的页面，用循环的方式，从路由配置文件中创建Route*/}
                {mainRoutes.map(route => {
                    return <Route key={route.path} {...route} /> //...route是独特的语法，用于将route的值全部传入组件
                })}

                {/*如果找不到上面的路由，则重定向到404页面 */}
                <Redirect to="/login" from="/" />
                <Redirect to="/404" />

            </Switch>

        </Router>
    </Provider>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
