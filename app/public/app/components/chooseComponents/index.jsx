import React, { Component } from 'react'
import './index.less'
import Single from '../littleComponents/single/single'
import Swiper from '../littleComponents/swiper/swiper'
import Word from '../littleComponents/word/word'

class ChooseComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="chooseComponent-container">
                <Single />
                <Swiper />
                <Word />
            </div>
        )
    }
}

export default ChooseComponent