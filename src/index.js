import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom";

import {mainRoutes} from "./routes";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/home" render={routeProps => <App {...routeProps}/>}/>
                {mainRoutes.map(route => {
                    return <Route key={route.path} {...route}/>
                })}
                <Redirect to="/404"/>
            </Switch>

        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
