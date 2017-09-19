import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import './index.less'
import phoneBg from './bg.jpg'
import SingleShowInPhone from '../componentInPhone/single/singleShowInPhone'
import SwiperShowInPhone from '../componentInPhone/swiper'
import deleteImg from './delete.png'
import upImg from './up.png'

class Phone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    chooseData = (data) => {
        this.props.dispatch({
            type: 'changeChooseData',
            payload: data
        })
    }
    deleteComponent = (e, id) => {
        e.stopPropagation();
        this.props.dispatch({
            type: 'deleteComponent',
            payload: {
                id: id
            }
        })
    }
    upMove = (e, index) => {
        e.stopPropagation();
        this.props.dispatch({
            type: 'innerPhoneUpMove',
            payload: {
                index: index
            }
        })
    }
    submit = async () => {
        if (this.props.cb.data.length == 0) {
            alert('error')
            return
        }
        const res = await fetch(`/api/save`, { method: 'POST', body: JSON.stringify({ data: this.props.cb.data }), headers: { 'Content-Type': 'application/json' } });
        const result = await res.json();
        if (result.code == 10000) {
            alert('成功')
        } else {

        }
    }
    render() {
        const phoneStyle = {
            backgroundImage: 'url(' + phoneBg + ')'
        }
        const activeStyle = {
            border: '3px solid #20a0ff'
        }
        //给个默认值
        let chooseData = this.props.cb.chooseData.length > 0 ? this.props.cb.chooseData : [{ id: 0 }]
        const innerComponents = this.props.cb.data.map((item, index) => {
            if (item.type == 1) {
                let styles = (item.fixedTop == true) ? {
                    'position': 'fixed',
                    'top': '90px',
                    'zIndex': '99',
                    'width': '316px'
                } : {}
                return (
                    <div className="out-container" style={{ boxSizing: 'border-box' }} key={index} style={(chooseData[0].id == item.id ? {...activeStyle, ...styles} : {...styles})} onClick={() => { this.chooseData(item) }}>
                        <img className="up" src={upImg} alt="" onClick={(e) => { this.upMove(e, index) }} />
                        <img className="delete" src={deleteImg} alt="" onClick={(e) => { this.deleteComponent(e, item.id) }} />
                        <SingleShowInPhone props={item} key={index} show={this.state.show} />
                    </div>
                )
            } else if (item.type == 2) {
                return (
                    <div className="out-container" style={{ border: '2px solid white', boxSizing: 'border-box', position: 'relative' }} key={index} style={(chooseData[0].id == item.id ? activeStyle : {})} onClick={() => { this.chooseData(item) }}>
                        <img className="up" src={upImg} alt="" onClick={(e) => { this.upMove(e, index) }} />
                        <img className="delete" src={deleteImg} alt="" onClick={(e) => { this.deleteComponent(e, item.id) }} />
                        <SwiperShowInPhone props={item} key={index} show={this.state.show} />
                    </div>
                )
            }
        })
        return (
            <div className="phone-container">
                <div className="inner-phone" style={phoneStyle}>
                    <div className="inner-container">
                        {innerComponents}
                    </div>
                </div>
                <button className="submit" onClick={() => { this.submit() }}>提交</button>
            </div>
        )
    }
}

//桥接store
const mapStateToProps = state => ({
    cb: state.WebApp
})
//桥接actions
function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ Actions });
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)