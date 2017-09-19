import React, { Component } from 'react'
import './index.less'

export default class CardSwiper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cardSwiperStyles: [],
            currentIndex: 1
        }
    }
    sliderClick = (index) => {
        clearInterval(this.timeOuter);
        this.changeIndex()
    }
    componentWillMount() {
        this.setState({
            cardSwiperStyles: [
                {
                    width: '60%',
                    transform: 'translate(-90%, -50%)',
                    opacity: '.7',
                    zIndex: 5
                },
                {
                    width: '80%',
                    transform: 'translate(-50%, -50%)',
                    opacity: '1',
                    zIndex: 10
                },
                {
                    width: '60%',
                    transform: 'translate(-10%, -50%)',
                    opacity: '.7',
                    zIndex: 5
                }
            ]
        })
    }
    componentDidMount() {
        //自动播放
        this.autoPlay()
    }
    autoPlay() {
        this.timeOuter = setInterval(function () {
            this.changeIndex()
        }.bind(this), 2000)
    }
    componentWillUnmount () {
        clearInterval(this.timeOuter);
    }
    //播放下一个
    changeIndex() {
        let new_styles = [ ...this.state.cardSwiperStyles ]
        let tmp = new_styles.splice(this.state.cardSwiperStyles.length-1, 1)
        let _index = this.state.currentIndex + 1
        let index = (_index == this.props.data.length? 0: _index)
        //得到新的currentIndex
        new_styles.splice(0, 0, tmp[0])
        this.setState({
            cardSwiperStyles: new_styles,
            currentIndex: index
        })
    } 
    render() {
        const Img = this.props.data.map( (item, index) => {
            return (
                <img src={item.imgUrl} alt="" key={index} style={{...this.state.cardSwiperStyles[index]}} onClick={() => {this.sliderClick(index)}}/>
            )
        })
        return (
            <div className="cardSwiper-container">
                {Img}
            </div>
        )
    }
}