import axios from 'axios'
import { api_permission_delete, api_permission_get_by_staffID, api_permission_get_by_vehicleID, api_permission_new } from './api'
import moment from 'moment'
export async function permissionGiveInGroup(list) {
    return new Promise((resolve, reject) => {
        axios.all(
            list.map((item, index) => {
                var d = {
                    staffID: item.staffID,
                    vehicleID: item.vehicleID,
                    time: moment().format(),
                }
                return axios({
                    url: api_permission_new,
                    method: "post",
                    data: d
                })
            })
        ).then(
            axios.spread(e => {
                resolve('完成')
            })
        )
    })
}

export async function permissionGive(staffID, vehicleID) {
    var d = {
        staffID: staffID,
        vehicleID: vehicleID,
        time: moment().format(),
    }
    const res = await axios({
        url: api_permission_new,
        method: "post",
        data: d
    })
    return res
}
export async function permissionGetByStaffID(staffID) {
    const res = await axios({
        url: api_permission_get_by_staffID,
        method: "get",
        params: {
            staffID: staffID
        }
    })
    return res.data.data.permission
}

export async function permissionGetByVehicle(vehicleID) {
    const res = await axios({
        url: api_permission_get_by_vehicleID,
        method: "get",
        params: {
            vehicleID: vehicleID
        }
    })
    return res.data.data.permission
}
export async function permissionDelete(id) {
    const res = await axios({
        url: api_permission_delete,
        method: "delete",
        params: {
            id: id
        }
    })
    return res.data.data.permission
}