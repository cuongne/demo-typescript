// import axios, { AxiosInstance } from 'axios'

import axios, { AxiosInstance } from "axios";

const linkRequest = (urlLink: string, sendToken = true) => {
    const request: AxiosInstance = axios.create({
        baseURL: urlLink,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const token = localStorage.getItem('token')
    if (token) {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    sendToken &&
        request.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token')
                if (token && config.headers) {
                    config.headers['Authorization'] = 'Bearer ' + token
                }
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )

    //Add a response interceptor
    return request
}

export default linkRequest