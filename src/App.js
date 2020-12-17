import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import {Button, Radio} from "antd";
import {Switch, Route, Redirect} from "react-router-dom"
import {homeRoutes} from "./routes";
import MainContainer from "./components/MainContainer";

function App() {

    return (

        //MainContainer是网页的顶层框架，包括顶部导航栏，侧边栏，正文内容。
        //在这里主要处理从上一层传过来的/home路径下的路由
        //比如说，/home/dashboard在路由文件中匹配的组件是Dashboard
        //网页的主框架不会变动，
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
                                return <route.component {...routeProps}/>
                            }}/>
                    );
                })}
                <Redirect to="/404"/>
            </Switch>
        </MainContainer>
    );
}

export default App;
