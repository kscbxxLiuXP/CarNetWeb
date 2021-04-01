import axios from 'axios'
import { api_vehicle_all, api_vehicle_getOne, api_vehicle_new } from './api';
import Qs from 'qs'
import moment from 'moment';
export async function vehicleRegisterInGroup(vehicleList) {
    axios.all(
        vehicleList.map((item, index) => {
            return axios({
                url: api_vehicle_new,
                method: "post",
                data: Qs.stringify({
                    name: item.vehicleName,
                    sign: item.licensePlateNumber,
                    addressID: item.vehicleAddress.id,
                    identification: item.vehicleIdentification,
                    registerTime: moment().format(),
                    activationTime: moment().format(),
                    state: 2,//2表示未激活
                    workState: 2,//停止中
                })
            })
        })
    ).then(console.log("done~!"))

}

export async function vehicleAll() {
    const res = await axios(
        {
            url: api_vehicle_all,
            method: "get"
        }
    )
    return res.data.data.vehicle
}

export async function vehicleGetOne(id) {
    const res = await axios(
        {
            url: api_vehicle_getOne,
            method: "get",
            params: {
                id: id
            }
        }
    )
    return res.data.data.vehicle
}