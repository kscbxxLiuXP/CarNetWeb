import { api_task_all, api_task_get_next_id, api_task_new, api_task_getOne, api_task_update, api_task_delete } from "./api";
import axios from 'axios'
import moment from "moment";
export async function taskGetNextID() {
    const res = await axios({
        url: api_task_get_next_id,
        method: "get",
    });
    return res.data.data.id

}

export async function taskNew(task) {
    task.state = 1
    task.progress = 0
    task.executeTime = moment().format()
    const res = await axios({
        url: api_task_new,
        method: "post",
        data: task
    })
    return res.data.data
}

export async function taskGetAll() {
    const res = await axios({
        url: api_task_all,
        method: "get"
    })
    return res.data.data.task
}
export async function taskGetOne(id) {
    const res = await axios({
        url: api_task_getOne,
        method: "get",
        params: {
            id: id
        }
    })
    return res.data.data.task
}

export async function taskUpdate(task) {
    const res = await axios({
        url: api_task_update,
        method: "put",
        data: task
    })
    return res.data.data
}

export async function taskDelete(id) {
    const res = await axios({
        url: api_task_delete,
        method: "delete",
        params: {
            id: id
        }
    })
    return res.data.data
}