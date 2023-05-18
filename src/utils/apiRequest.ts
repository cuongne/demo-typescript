import { BASENAME } from "@/constant"
import linkRequest from "@/utils/request"
const REQUEST = `http://${BASENAME}/api`
export const AuthRequest = {

    post: (url: string, param = {}, config = {}) => {
        return linkRequest(`${REQUEST}`).post(url, param, config)
    }
}
export const UserRequest = {
    get: (url: string) => {
        return linkRequest(`${REQUEST}`).get(url)
    },
    delete: (url: string) => {
        return linkRequest(`${REQUEST}`).delete(url)
    },
    post: (url: string, param = {}, config = {}) => {
        return linkRequest(`${REQUEST}`).post(url, param, config)
    },
    put: (url: string, param = {}, config = {}) => {
        return linkRequest(`${REQUEST}`).put(url, param, config)
    }
}
