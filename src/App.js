import './App.css';
import React from "react";
import 'antd/dist/antd.css'
import { Switch, Route, Redirect } from "react-router-dom"
import { homeRoutes } from "./routes";
import MainContainer from "./components/MainContainer";
import { isLogin, isTokenValid } from './utils/auth'
function App() {

    return isLogin() ? (

        //MainContainer是网页的顶层框架，包括顶部导航栏，侧边栏，正文内容。
        //在这里主要处理从上一层传过来的/home路径下的路由
        //比如说，/home/dashboard在路由文件中匹配的组件是Dashboard
        //网页的主框架不会变动，

        isTokenValid() ? (
            <MainContainer className="App">
                <Switch>
                    {/*从路由配置中匹配页面*/}
                    {homeRoutes.map(route => {
                        return (
                            <Route
                                key={route.path}
                                {...route}
                                //显示在正文内容中的组件
                                render={routeProps => {
                                    return <route.component {...routeProps} />
                                }} />
                        );
                    })}
                    <Redirect to="/home/dashboard" form="/home" />
                    <Redirect to="/404" />
                </Switch>
            </MainContainer>
        ) : (<Redirect to="/login?type=1" />)//type=1因为登录超时

    ) : (<Redirect to="/login?type=0" />)// type=0 因为没有登录
};


export default App;
