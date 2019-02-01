import React, { Component } from 'react';
import logo from '../../images/logo.svg';

import Nav from '../Nav/Nav';



export default class About extends Component {
    render() {
        return (
            <div>
                <div className="app">
                    <div className="app__header">
                        <img src={logo} className="app__logo" alt="logo" />
                        <h2>About</h2>
                        <Nav />
                    </div>
                </div>

                <div>
                    <p>Si vous voyez ce message vous êtes connecté </p>
                </div>
            </div>
        )
    }
}