import axios from 'axios'
import { api_setting_getOne } from './api';


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