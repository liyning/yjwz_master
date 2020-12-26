import request from '@/common/request.js'

const api = {}

api.request  = ({url, method, params, data, dataType}) => request.globalRequest(url, method, params, data, dataType)

export default api