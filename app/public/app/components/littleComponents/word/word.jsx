// 文字
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../../actions'
import '../single/single.less'
import imgSrc from './word.png'

class Word extends React.Component {
    constructor(props) {
        super(props)
    }
    handleClick = (val) => {
        this.props.dispatch({
            type: 'addComponent',
            payload: {
                id: new Date().getTime(),
                type: val,
                message: '怪猫游戏'
            }
        })
    }
    render() {
        return (
            <div className="singleDownLoad-out">
                <div className="singleDownLoad-container" onClick={this.handleClick.bind(this, 3)}>
                    <img className="showImg" src={imgSrc}/>
                </div>
                <p className="c-title">纯文本</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Word)