import axios, { AxiosResponse } from 'axios'

const baseURL = location.protocol + '//www' + location.hostname.substr(location.hostname.indexOf('.'))

export const api = axios.create({ baseURL })

export const getCallData = (res: AxiosResponse) => {
  return res?.status >= 300 ? Promise.reject(new Error('failed to call url')) : res?.data
}
