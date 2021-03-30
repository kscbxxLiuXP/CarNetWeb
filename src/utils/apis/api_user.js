import axios from "axios";
import { api_user_getOne, api_user_update } from "./api";

export async function userGetOne(username) {
    const res = await axios({
        url: api_user_getOne,
        method: "get",
        params: {
            username: username
        }

    })
    return res.data.data.user
}
export async function userUpdate(user) {
    const res = await axios({
        url: api_user_update,
        method: "put",
        data: user

    })
    return res.data.data
}