import axios from 'axios'
import { api_setting_getOne, api_setting_update } from './api';


export async function settingGetRegisterOpen() {
    const res = await axios({
        url: api_setting_getOne,
        method: "get",
        params: {
            id: 1
        }
    });
    return res.data.data.setting.value
}

export async function settingUpdateRegisterOpen(value){
    const res = await axios({
        url:api_setting_update,
        method:"put",
        params:{
            id:1,
            value:value
        }
    })
    return res.data.data
}

export async function settingGetAllowPSDLogin() {
    const res = await axios({
        url: api_setting_getOne,
        method: "get",
        params: {
            id: 2
        }
    });
    return res.data.data.setting.value
}

export async function settingAllowPSDLogin(value){
    const res = await axios({
        url:api_setting_update,
        method:"put",
        params:{
            id:2,
            value:value
        }
    })
    return res.data.data
}