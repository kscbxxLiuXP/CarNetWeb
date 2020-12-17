import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import {Button, Radio} from "antd";
import {Switch, Route, Redirect} from "react-router-dom"
import {homeRoutes} from "./routes";

function App() {
    return (
        <div className="App">
            <h1>我是APP</h1>
            <Switch>
                {homeRoutes.map(route => {
                    return (
                        <Route key={route.path} {...route} render={routeProps => {
                            return <route.component {...routeProps}/>
                        }}/>
                    );
                })}
                <Redirect to="/404"/>
            </Switch>
        </div>
    );
}

export default App;
