import axios from 'axios'
import { api_address_all } from './api';

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