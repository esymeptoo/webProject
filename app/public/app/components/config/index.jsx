import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import './index.less'

import SingleConfig from './single/singleConfig'
import SwiperConfig from './swiper/swiperConfig'

class Config extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let chooseData = this.props.cb.chooseData.map((item, index) => {
            if (item.type == 1) {
                return (
                    <SingleConfig key="1" props={item} />
                )
            } else if (item.type == 2) {
                return (
                    <SwiperConfig key="2" props={item}/>
                )
            }
        });
        return (
            <div className="config-container">
                {chooseData}
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

export default connect(mapStateToProps, mapDispatchToProps)(Config)

