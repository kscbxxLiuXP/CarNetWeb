import axios from 'axios'
import { api_job_all, api_job_current_Job_By_VehicleID, api_job_getOne, api_job_last_Job_By_VehicleID } from './api'
export async function jobGetOne(id) {
    const res = await axios({
        url: api_job_getOne,
        method: "get",
        params: {
            id: id
        }
    })
    return res.data.data.job
}
export async function jobGetAll() {
    const res = await axios({
        url: api_job_all,
        method: "get",
    })
    return res.data.data.job
}
export async function jobGetCurrentJobByVehicleID(vehicleID) {
    const res = await axios({
        url: api_job_current_Job_By_VehicleID,
        method: "get",
        params: {
            vehicleID: vehicleID
        }
    })
    if (res.data.code !== 0) {
        return { id: -1 }
    }
    return res.data.data.job
}
export async function jobGetLastJobByVehicleID(vehicleID) {
    const res = await axios({
        url: api_job_last_Job_By_VehicleID,
        method: "get",
        params: {
            vehicleID: vehicleID
        }
    })
    if (res.data.code !== 0) {
        return { id: -1 }
    }
    return res.data.data.job
}
