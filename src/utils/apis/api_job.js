import axios from 'axios'
import { api_job_all, api_job_getOne } from './api'
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