import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import $ from 'jquery'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less'

let index = 0,
    mySwiper = {}
//添加meta标签
let oMeta = document.createElement('meta');
oMeta.name = "viewport";
oMeta.content = "width=device-width,initial-scale=1.0";
document.getElementsByTagName('head')[0].appendChild(oMeta);


class ReactSwiper extends Component {
    componentDidMount() {
        //组件加载之后实例化
        new Swiper('.swiper-container' + index, {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            ...this.props.data.config,
            fade: {
                crossFade: true,
            },
            autoplayDisableOnInteraction : false,
        })
        index ++;
        console.log(index)
        // console.log(mySwiper[index -1])
    }
    render() {
        let SwiperImg = this.props.data.img.map((item, index) => {
            return (
                <div className="swiper-slide" key={index} style={{textAlign: 'center'}}>
                    <img className="swiper-img" style={{width: this.props.data.style.img.width}} src={item.imgUrl} alt=""/>
                </div>
            )
        })
        return (
            <div className={'swiper-container'+ ' ' + 'swiper-container' + index} style={{ width: '100%', height: 'auto', background: 'transparent' }}>
                <div className="swiper-wrapper">
                    {SwiperImg}
                </div>
            </div>
        )
    }
}

// export default ReactSwiper
//桥接store
const mapStateToProps = state => ({
    cb: state.WebApp
})
//桥接actions
function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ Actions });
    return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactSwiper)