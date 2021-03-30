import axios from 'axios'
import { api_address_all, api_address_delete, api_address_new, api_address_update } from './api';

export async function addressGetOne(id) {
    const res = await axios({
        url: api_address_all,
        method: "get",
        params: {
            id: id
        }
    });
    return res.data.data.address
}

export async function addressGetAll() {
    const res = await axios({
        url: api_address_all,
        method: "get"
    });
    return res.data.data.address
}
export async function addressNew(address) {
    const res = await axios({
        url: api_address_new,
        method: "post",
        data: address
    });
    return res.data.data
}
export async function addressUpdate(address) {
    const res = await axios({
        url: api_address_update,
        method: "put",
        data: address
    });
    return res.data.data
}
export async function addressDelete(id) {
    const res = await axios({
        url: api_address_delete,
        method: "delete",
        params: {
            id: id
        }
    });
    return res.data.data
}