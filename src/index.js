import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//Routes
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Index from './components/App/App';
import About from './components/About/About';



const Main = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Index} />
            <Route exact path={"/about"} component={About} />
        </Switch>
    )
};

const Home = () => {
    return (
        <div>
            <Main />
        </div>
    )
};



ReactDOM.render((
    <BrowserRouter>
        <Home />
    </BrowserRouter>
),
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();




