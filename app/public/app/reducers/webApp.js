//reducer   复杂的switch 迟早有一天我会把你分割
import * as _ from '../constants/webApp'

const initialData = {
    //data用于存放页面所有选中组件的数据流
    data: [],
    chooseData: []
}

export default function AddLittle(state = initialData, action) {
    let data;
    switch (action.type) {
        case _.ADDCOMPONENT:
            if (state.data.length == 0) {
                state.chooseData.push(action.payload)
            }
            state.data.push(action.payload)
            return {
                ...state
            }
        case _.DELETECOMPONENT:
            data = state.data.filter(item => {
                return item.id !== action.payload.id
            })
            return { ...state, data: data, chooseData: [] }
        case _.CHANGECHOOSEDATA:
            state.chooseData = []
            state.chooseData.push(action.payload)
            return {
                ...state
            }
        case _.INPUTCHANGE:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.jumpUrl = action.payload.text
                    return item
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.UPLOADSUCCESS:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.imgUrl = action.payload.imgUrl
                    return item
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.CHECKBOX:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.fixedTop = action.payload
                    return item
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.SWIPERUPLOADSUCCESS:
            const { index, imgUrl } = action.payload
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.img[index].imgUrl = imgUrl
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.ADDSWIPERIMG:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.img.push({
                        imgUrl: action.payload.imgUrl
                    })
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.DELETESWIPERIMG:
            if (state.chooseData[0].img.length == 1) {
                alert('至少保留一张图片')
                return {
                    ...state
                }
            }
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.img.splice(action.payload.index, 1)
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.MOVESWIPERIMG:
            //😎😆😝🤣😄
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    let tmp = item.img.splice(action.payload.index, 1)
                    item.img.splice(action.payload.index - 1, 0, tmp[0])
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.uploadSwiperBg:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.backUrl = action.payload.imgUrl
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.CHANGESTYLE:
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    Object.assign(item.style, action.payload)
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.CHANGEANIMATION: 
            data = state.data.map(item => {
                if (item.id == state.chooseData[0].id) {
                    item.config.chooseAnimation = action.payload
                }
                return item
            })
            return {
                ...state,
                data: data
            }
        case _.INNERPHONEUPMOVE: 
            let tmp = state.data.splice(action.payload.index, 1)
            state.data.splice(action.payload.index - 1, 0, tmp[0])
            return {
                ...state
            }
        default: return state;
    }
}