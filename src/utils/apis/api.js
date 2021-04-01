//地址
export const basic_url = "http://127.0.0.1:8080/v1"

//basic address
export const basic_address_url = basic_url + '/address'
export const basic_setting_url = basic_url + '/setting'
export const basic_vehicle_url = basic_url + '/vehicle'
export const basic_staff_url = basic_url + '/staff'
export const basic_task_url = basic_url + '/task'
export const basic_user_url = basic_url + '/user'
export const basic_job_url = basic_url + '/job'

//address
export const api_address_getOne = basic_address_url + '/get'
export const api_address_all = basic_address_url + '/all'
export const api_address_new = basic_address_url + '/new'
export const api_address_update = basic_address_url + '/update'
export const api_address_delete = basic_address_url + '/delete'

//setting
export const api_setting_getOne = basic_setting_url + '/get'
export const api_setting_update = basic_setting_url + '/update'

//vehicle
export const api_vehicle_new = basic_vehicle_url + '/new'
export const api_vehicle_all = basic_vehicle_url + '/all'
export const api_vehicle_getOne = basic_vehicle_url + '/get'

//staff
export const api_staff_new = basic_staff_url + '/new'
export const api_staff_check_for_new = basic_staff_url + '/checkForNew'
export const api_staff_getOne = basic_staff_url + '/get'
export const api_staff_first = basic_staff_url + '/first'
export const api_staff_all = basic_staff_url + '/all'
export const api_staff_get_next_id = basic_staff_url + '/getNextID'
export const api_staff_upload_photo = basic_staff_url + '/uploadPhoto'
export const api_staff_filter_by_condition = basic_staff_url + '/filterByCondition'
export const api_staff_update = basic_staff_url + '/update'
export const api_staff_delete = basic_staff_url + '/delete'

//task
export const api_task_get_next_id = basic_task_url + '/getNextID'
export const api_task_new = basic_task_url + '/new'
export const api_task_all = basic_task_url + '/all'
export const api_task_getOne = basic_task_url + '/get'
export const api_task_update = basic_task_url + '/update'
export const api_task_delete = basic_task_url + '/delete'

//user
export const api_user_getOne = basic_user_url + '/get'
export const api_user_update = basic_user_url + '/update'

//job
export const api_job_getOne = basic_job_url + '/get'
export const api_job_all = basic_job_url + '/all'
