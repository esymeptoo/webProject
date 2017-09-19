import axios from 'axios'
let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
};
//上传图片
export const upload = (e, data) => async dispatch => {
    var file;
    try {
        file = e.target.files[0].type.split('/')[1];
    }
    catch (e) {
        file = ''
    }
    if (file == 'jpeg' || file == 'png' || file == 'gif' || file == 'jpg') {
        console.log('准备上传')
        let param = new FormData();
        param.append('img', e.target.files[0], e.target.files[0].name);
        e.target.value = ''
        const res = await uploadImg(param, config);
        await dispatch({
            type: data.dispatch,
            payload: {
                imgUrl: res,
                index: data.index || 0
            }
        })
    } else {
        alert('请上传正确的图片格式')
    }
}
//文本框change事件
export const inputChange = (text) => dispatch => {
    dispatch({
        type: 'inputChange',
        payload: {
            text: text
        }
    })
}
//单选框change事件
export const checkboxChange = (flag) => dispatch => {
    dispatch({
        type: 'checkboxChange',
        payload: flag
    })
}
//操作轮播图 --> 删除或上移一个单位
export const operateSwiperImg = (data) => dispatch => {
    dispatch({
        type: data.dispatch,
        payload: {
            index: data.index || 0
        }
    })
}
//改变轮播组件style
export const changeStyle = (data) => dispatch => {
    dispatch({
        type: data.dispatch,
        payload: data.data
    })
}

//动画效果改变
export const changeSlickAnimation = data => dispatch  => {
    dispatch({
        type: data.dispatch,
        payload: data.data
    })
}

//上传包装成promise 以便使用async-await  好看一点  ✧(≖ ◡ ≖✿)嘿嘿
function uploadImg(param, config) {
    return new Promise((resolve, reject) => {
        axios.post('/api/upload', param, config)
            .then(response => {
                resolve(response.data.url)
                if (response.data !== 10000) {
                    reject('error')
                } else {
                    resolve(response.data.url)
                }
            })
            .catch(e => {
                console.log(e.message)
            })
    })
}