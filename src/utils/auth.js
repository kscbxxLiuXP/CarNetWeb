import moment from 'moment';
//存储用户的授权信息

// token 格式
//  key**time
// aaaaaa**2020-12-18-22-26-00

const tokenName = 'car-net-token';

export function getToken() {
    return localStorage.getItem(tokenName);
}

//获取token的用户名
export function getUsername() {
    let token = getToken();
    if (!token)
        return "未登录";


    return token.split('%')[0];
}

//设置token
export function setToken(token) {
    localStorage.setItem(tokenName, token);
}

//清除token
export function clearToken() {
    localStorage.removeItem(tokenName);
}

//是否已经登录
export function isLogin() {
    if (localStorage.getItem(tokenName)) {
        return true;
    }
    return false;
}

//token是否已经过期
export function isTokenValid() {
    //获取token
    let token = localStorage.getItem(tokenName);
    //如果没有获取到token直接返回false;
    if (!token)
        return false;

    //比较token的时间
    let tokenTime = token.split('**')[1];
    tokenTime = moment(tokenTime, "YYYY-MM-DD-HH-mm-ss");
    let nowTime = moment();

    //当现在的时间大于token的时间，说明已经过了token失效期，所以token不合法
    if (nowTime > tokenTime) {
        //token不合法
        //清除Token
        clearToken(tokenName);
        return false;
    } else {
        return true;
    }
}