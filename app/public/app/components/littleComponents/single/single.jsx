// 简单的点击跳转图片组件    需要上传图片和填写跳转链接
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../../actions'
import './single.less'
import imgSrc from './single.png'
// import singleDemo from './singleDemo.png'

class Single extends React.Component {
    constructor(props) {
        super(props)
    }
    handleClick = (val) => {
        this.props.dispatch({
            type: 'addComponent',
            payload: {
                id: new Date().getTime(),
                type: val,
                imgUrl: '/images/singleDemo1.png',
                jumpUrl: '',
                fixedTop: false
            }
        })
    }
    render() {
        return (
            <div className="singleDownLoad-out">
                <div className="singleDownLoad-container" onClick={this.handleClick.bind(this, 1)}>
                    <img className="showImg" src={imgSrc}/>
                </div>
                <p className="c-title">图片链接</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Single)