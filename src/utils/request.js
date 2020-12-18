import axios from 'axios'
import { getToken  } from './auth'

//对axios进行封装
//要求axios发送请求必须携带用户token
//服务端接受请求时会验证用户token权限

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000
});


// Add a request interceptor
//  全局请求拦截，发送请求之前执行，请求头中添加用户token
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['authorization'] = 'Bearer ' + getToken()
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
//  请求返回之后执行
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params  url参数
 */
export function get(url, params) {
    return instance.get(url, {
        params,
    });
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function post(url, data) {
    return instance.post(url, data);
}

/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function put(url, data) {
    return instance.put(url, data);
}

/**
 * delete请求
 * @param {*} url   请求地址
 */
export function del(url) {
    return instance.delete(url);
}