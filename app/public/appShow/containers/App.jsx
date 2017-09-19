import Single from '../components/single/singleShowInPhone'
import Swiper from '../components/swiper'
const url = require('url')

// 显示在手机中的单图组件
import React from 'react'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        const { id } = url.parse(window.location.href, true).query
        this.achieveData(id)
    }
    achieveData = async (id) => {
        const res = await fetch(`/api/achieve?id=${id}`);
        const result = await res.json();
        this.setState({
            data: result.data.page
        })
    }
    render() {
        const innerComponents = this.state.data.map((item, index) => {
            if (item[0].type == 1) {
                if (item[0].jumpUrl == '') {
                    return (
                        <Single data={item[0]} key={index} />
                    )
                } else {
                    return (
                        <a href={item[0].jumpUrl}>
                            <Single data={item[0]} key={index} />
                        </a>
                    )
                }

            } else if (item[0].type == 2) {
                return (
                    <Swiper data={item[0]} key={index} />
                )
            }
        })
        return (
            <div>
                {innerComponents}
            </div>
        )
    }
}

export default App