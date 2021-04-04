import axios from 'axios'

import { api_staff_check_for_new, api_staff_delete, api_staff_filter_by_condition, api_staff_all, api_staff_getOne, api_staff_get_next_id, api_staff_new, api_staff_update, api_staff_upload_photo } from './api';
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
                    taskNum: 0,
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

export async function staffFilterByCondtion(id, name, idNumber) {
    const res = await axios({
        url: api_staff_filter_by_condition,
        method: "get",
        params: {
            id: id,
            name: name,
            idNumber: idNumber
        }
    })
    return res.data.data.staff
}

export async function staffUpdate(newStaff) {
    const res = await axios({
        url: api_staff_update,
        method: "put",
        data: newStaff
    })
    return res.data.data.staff
}


export async function staffDelete(id) {
    const res = await axios({
        url: api_staff_delete,
        method: "delete",
        params: {
            id: id
        }
    })
    return res.data.data.staff
}

export async function staffDeleteMany(ids) {
    return new Promise((resolve, reject) => {
        axios.all(
            ids.map((item, index) => {
                return axios({
                    url: api_staff_delete,
                    method: "delete",
                    params: {
                        id: item
                    }
                })
            })
        ).then(
            axios.spread(e => {
                resolve('完成')
            })
        )
    })
}

export async function staffGetByID(id){
    const res = await axios({
        url:api_staff_getOne,
        method:"get",
        params:{
            id:id
        }
    })
    return res.data.data.staff
}
export async function staffGetAll(){
    const res = await axios({
        url:api_staff_all,
        method:"get"
    })
    return res.data.data.staff
}