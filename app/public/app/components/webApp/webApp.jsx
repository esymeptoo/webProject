import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import './webApp.less'
import ChooseComponent from '../chooseComponents'
import Phone from '../phone'
import Config from '../config'

class WebApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
        return (
            <div className="webApp-container">
                <ChooseComponent />
                <Phone />
                <Config />
            </div>
        )
    }
}

//桥接store
const mapStateToProps = state => ({
  cb: state.WebApp
})
//桥接actions
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WebApp)