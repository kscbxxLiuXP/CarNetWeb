import axios from 'axios'

import { api_staff_check_for_new, api_staff_first, api_staff_get_next_id, api_staff_new } from './api';
import Qs from 'qs'
export async function staffCheckForNew(staffList) {
    var ee = []
    return new Promise((resolve, reject) => {
        axios.all(
            staffList.map((item, index) => {
                return axios({
                    url: api_staff_check_for_new,
                    method: "get",
                    params: {
                        id: item.id,
                        idNumber: item.idNumber
                    }
                }).then(e => {
                    if (e.data.code === 1) {
                        e.data.data.error.forEach(element => {
                            ee.push(`[ERROR] ${item.id}: ${element}`)
                        });
                    }
                })
            })
        ).then(
            axios.spread(e => {
                resolve(ee)
            })
        )
    })
}

export async function staffRegisterInGroup(staffList) {
    axios.all(
        staffList.map((item, index) => {
            return axios({
                url: api_staff_new,
                method: "post",
                data: Qs.stringify({
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    idNumber: item.idNumber,
                    gender: item.gender,
                    photoed: 0,
                    workState: 2,
                    state: 2
                })
            })
        })
    ).then(console.log("done~!"))

}
export async function staffGetNextID() {
    const res = await axios({
        url: api_staff_get_next_id,
        method: "get",
    });
    return res.data.data.id

}