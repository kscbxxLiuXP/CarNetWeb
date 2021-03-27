//地址
export const basic_url = "http://127.0.0.1:8080/v1"

//basic address
export const basic_address_url = basic_url + '/address'
export const basic_setting_url = basic_url + '/setting'
export const basic_vehicle_url = basic_url + '/vehicle'

//address
export const api_address_getOne = basic_address_url + '/get'
export const api_address_all = basic_address_url + '/all'

//setting
export const api_setting_getOne = basic_setting_url + '/get'

//vehicle
export const api_vehicle_new = basic_vehicle_url+'/new'