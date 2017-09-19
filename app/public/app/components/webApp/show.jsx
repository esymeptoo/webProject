import React, { Component } from 'react'
import Single from '../componentInPhone/single/singleShowInPhone'
import Swiper from '../componentInPhone/swiper'
const url = require('url')

class Show extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        console.log(url.parse(window.location.href, true))
        const { id } = url.parse(window.location.href, true).query
        this.achieveData('59ace96c70b45c5926a6c36c')
    }
    achieveData = async (id) => {
        const res = await fetch(`/api/achieve?id=${id}`);
        const result = await res.json();
        console.log(result)
        this.setState({
            data: result.data.page
        })
    }
    render() {
        const innerComponents = this.state.data.map((item, index) => {
            if (item[0].type == 1) {
                if (item[0].jumpUrl == '') {
                    return (
                        <Single props={item[0]} key={index} />
                    )
                } else {
                    return (
                        <a href={item[0].jumpUrl}>
                            <Single props={item[0]} key={index} />
                        </a>
                    )
                }

            } else if (item[0].type == 2) {
                return (
                    <Swiper props={item[0]} key={index} />
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
export default Show