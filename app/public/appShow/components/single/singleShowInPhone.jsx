// 显示在手机中的单图组件
import React from 'react'
import './singleShowInPhone.less'

class SingleShowInPhone extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let data = this.props.data
        let fixTop = (data.fixedTop == true) ? {
            'position': 'fixed',
            'top': '0',
            'zIndex': '99',
            'width': document.body.clientWidth
        }: {}
        return (
            <div className="singleShowInPhone-container" style={fixTop}>
                <img src={data.imgUrl} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
        )
    }
}

export default SingleShowInPhone