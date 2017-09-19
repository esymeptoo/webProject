// 显示在手机中的单图组件
import React from 'react'
import './index.less'
import ReactSlick from 'react-slick'

class SwiperShowInPhone extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let data = this.props.data
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
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            // cssEase: 'ease-to-out',
            swipeToSlide: false,
            autoplayDisableOnInteraction: false
        };
        //轮播方式
        if (data.config.chooseAnimation === 0) {
            Object.assign(settings, {
                draggable: false
            })
        }
        //轮播方式
        Object.assign(settings, {
            [data.config.animation[data.config.chooseAnimation]]: true
        })
        return (
            <div className="swiperShowInPhone-container" style={{ position: 'relative' }}>
                <img className="swiper-bg" src={data.backUrl} alt="" />
                <div className="_swiper-container" style={swiperStyles}>
                    <ReactSlick {...settings} style={{ height: 'auto', width: '100%', border: '1px solid red' }}>
                        {Img}
                    </ReactSlick>
                </div>
            </div>
        )
    }
}

export default SwiperShowInPhone