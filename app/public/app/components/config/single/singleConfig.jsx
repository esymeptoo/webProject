import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../../actions'
import './singleConfig.less'

class SingleConfig extends React.Component {
    constructor(props) {
        super(props)
    }
    handleChange = (e) => {
        this.props.actions.inputChange(e.target.value)
    }
    uploadImg = (e) => {
        this.props.actions.upload(e, {
            dispatch: 'uploadSuccess'
        })
    }
    toBeTop = (e) => {
        this.props.actions.checkboxChange(e.target.checked)
    }
    render() {
        return (
            <div className="singleConfig-container">
                <label htmlFor="">链接</label>&nbsp;&nbsp;
                <input type="text" placeholder="请填写跳转链接" value={this.props.props.jumpUrl} onChange={(e) => { this.handleChange(e) }} />
                <div style={{ position: 'relative' }}>
                    <button className="upload-img">上传图片</button>
                    <input type="file" onChange={(e) => { this.uploadImg(e) }} />
                </div>
                <input type="checkbox" checked={this.props.cb.chooseData[0].fixedTop} onChange={(e) => {this.toBeTop(e)}}/> <span style={{fontSize: '12px'}}>是否固定在头部</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleConfig)