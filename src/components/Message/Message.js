import React, { Component } from 'react';
import './Message.css';
export default class Message extends Component {
    render() {
        return (
            <div className="message">
                <div className="message">
                <span className="message__author">
                    {this.props.message.userName}:
                </span>
                    {this.props.message.message}
                    {this.props.message.imageUrl ? <img src={this.props.message.imageUrl} /> : ''}
                </div>
      </div>
        )
    }
}

