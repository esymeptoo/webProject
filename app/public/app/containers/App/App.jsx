import React, { Component } from 'react'
import './App.less'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="app-container">{this.props.children}</div>
            </div>
        )
    }
}