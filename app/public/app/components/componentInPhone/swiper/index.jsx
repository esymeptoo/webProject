// 显示在手机中的单图组件
import React from 'react'
import './index.less'
import ReactSlick from 'react-slick'
import CardSwiper from '../cardSwiper'


class SwiperShowInPhone extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let data = this.props.props
        //配置轮播样式 
        let swiperStyles = data.style.swiper
        Object.assign(swiperStyles, {
            position: 'absolute',
        })
        let Img = data.img.map((item, index) => {
            return (
                <div key={index} style={{ textAlign: 'center' }}>
                    <img style={{ width: (data.style.img.width), display: 'inline-block', margin: 'auto' }} src={item.imgUrl} />
                </div>
            )
        })
        let settings,
            innerSwiper = [];
        if (data.config.chooseAnimation == 2) {
            innerSwiper.push(
                <CardSwiper data={data.img} key="2"/>
            )
        } else {
            settings = {
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                // cssEase: 'ease-to-out',
                swipeToSlide: false,
            };
            //轮播方式
            if (data.config.chooseAnimation === 0) {
                Object.assign(settings, {
                    draggable: false
                })
            }
            Object.assign(settings, {
                [data.config.animation[data.config.chooseAnimation]]: true
            })
            innerSwiper.push(
                <ReactSlick {...settings} style={{ height: 'auto', width: '100%' }} key="1">
                    {Img}
                </ReactSlick>
            )
        }
        return (
            <div className="swiperShowInPhone-container">
                <img className="swiper-bg" src={data.backUrl} alt="" />
                <div className="_swiper-container" style={swiperStyles}>
                    {innerSwiper}
                </div>
            </div>
        )
    }
}


export default SwiperShowInPhone